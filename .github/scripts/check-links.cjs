// Full static link inventory and bounded live HTTP checks. No deployment side effects.
// HTTP strategy follows emqx.com external-link-audit: dedupe, HEAD/GET fallback, retry, redirect chain.
const fs = require('node:fs'),
  path = require('node:path'),
  { createRequire } = require('node:module');
const args = process.argv.slice(2),
  opt = (key, def) => (args.includes(key) ? args[args.indexOf(key) + 1] : def);
if (args.includes('--help')) {
  console.log(
    'node check-links.cjs --frontend DIR --sources DIR --dist DIR --version VERSION --output DIR [--builds JSON] [--inventory-only] [--resume] [--offline]',
  );
  process.exit(0);
}
const frontend = path.resolve(opt('--frontend', '.')),
  out = path.resolve(opt('--output', 'link-audit'));
fs.mkdirSync(out, { recursive: true });
const requireDeps = createRequire(path.join(frontend, 'package.json')),
  MarkdownIt = requireDeps('markdown-it'),
  { Parser } = requireDeps('htmlparser2');
const md = new MarkdownIt({ html: true, linkify: true }),
  records = new Map(),
  ignored = new Map(),
  anchors = new Map();
let htmlCount = 0,
  mdCount = 0;
const builds = opt('--builds')
  ? JSON.parse(fs.readFileSync(opt('--builds'), 'utf8'))
  : [
      {
        version: opt('--version'),
        dist: path.resolve(opt('--dist')),
        sources: path.resolve(opt('--sources')),
      },
    ];
const timeout = Number(opt('--timeout', '15000')),
  concurrency = Number(opt('--concurrency', '8'));
const manifest = { versions: builds.map((b) => b.version), builds };
function walkFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? walkFiles(path.join(dir, e.name), ext)
        : e.name.endsWith(ext)
          ? [path.join(dir, e.name)]
          : [],
    );
}
function sourceFor(build, rel) {
  const parts = rel.split('/'),
    source = path.join(
      build.sources,
      parts[0] === 'zh' ? 'zh_CN' : 'en_US',
      ...parts.slice(3),
    );
  return {
    version: build.version,
    page: 'https://docs.emqx.com/' + rel.replace(/\.md$/, '.html'),
    kind: 'markdown',
    source,
    line: 1,
    sourceUrl: source,
  };
}
function skipReason(u, raw) {
  if (!['http:', 'https:'].includes(u.protocol)) return 'non-http scheme';
  if (u.username || u.password) return 'URL contains credentials';
  if (
    /\$\{|\{[^}]+\}|\[(?:lang|locale|host|ip)[^\]]*\]|<[^>]*>|(?:^|\/)\:[a-z][\w-]*(?:\/|$)/i.test(
      u.hostname === 'docs.emqx.com' ? raw.split('#')[0] : raw,
    )
  )
    return 'template or placeholder';
  const h = u.hostname.toLowerCase();
  if (h === 'x.x.x.x') return 'IP address placeholder';
  if (
    /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|\[?::1\]?$)/.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
    !h.includes('.') ||
    /\.(local|internal|test|invalid)$/.test(h)
  )
    return 'local/private/example host';
  if (
    /(^|\.)(example\.(com|org|net)|example|your-domain\.com)$/.test(h) ||
    /^192\.0\.2\.|^198\.51\.100\.|^203\.0\.113\./.test(h)
  )
    return 'documentation example host';
  return null;
}
function localFor(u) {
  if (u.hostname !== 'docs.emqx.com') return null;
  const p = decodeURIComponent(u.pathname),
    m = p.match(/^\/(en|zh)\/emqx-neuron\/(latest|v[\d.]+)\//);
  const build = m ? builds.find((b) => b.version === m[2]) : null;
  if (!build) {
    for (const b of builds) {
      const file = path.join(b.dist, p);
      if (fs.existsSync(file) && fs.statSync(file).isFile())
        return { file, exists: true, version: b.version, shared: true };
    }
    return null;
  }
  let file = path.join(build.dist, p);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, 'index.html');
  return { file, exists: fs.existsSync(file), version: build.version };
}
function add(raw, usage, kind, base) {
  raw = raw.trim();
  if (!raw) return;
  let u;
  try {
    u = new URL(raw, base);
  } catch {
    const k = 'invalid:' + raw;
    if (!ignored.has(k))
      ignored.set(k, { url: raw, reason: 'invalid URL', usages: [] });
    ignored.get(k).usages.push(usage);
    return;
  }
  const reason = skipReason(u, raw);
  if (reason) {
    const key = u.href;
    if (!ignored.has(key)) ignored.set(key, { url: key, reason, usages: [] });
    const r = ignored.get(key);
    if (r.usages.length < 30) r.usages.push(usage);
    return;
  }
  if (
    usage.kind !== 'generated' &&
    !usage.keyPath &&
    kind === 'link' &&
    !/^https?:\/\//i.test(raw) &&
    u.hostname === 'docs.emqx.com'
  ) {
    if (u.pathname.endsWith('.md'))
      u.pathname = u.pathname.slice(0, -3) + '.html';
    else if (!path.posix.extname(u.pathname) && !u.pathname.endsWith('/')) {
      const candidate = new URL(u);
      candidate.pathname += '.html';
      if (localFor(candidate)?.exists) u = candidate;
    }
  }
  const hash = u.hash;
  u.hash = '';
  const key = u.href;
  let r = records.get(key);
  if (!r) {
    const local = localFor(u);
    r = {
      url: key,
      declaredUrls: [],
      kinds: [],
      usages: [],
      usageKeys: new Set(),
      local,
      needsHttp: !local,
      fragments: [],
    };
    records.set(key, r);
  }
  if (!r.declaredUrls.includes(raw)) r.declaredUrls.push(raw);
  if (!r.kinds.includes(kind)) r.kinds.push(kind);
  // Resolve URLs for the version being built locally; probe other destinations online.
  if (
    usage.kind !== 'generated' &&
    (/^https?:\/\//i.test(raw) || raw.startsWith('//')) &&
    !r.local
  )
    r.needsHttp = true;
  if (hash && !r.fragments.includes(hash)) r.fragments.push(hash);
  const usageKey = [usage.version, usage.source, usage.line, kind].join('|');
  if (!r.usageKeys.has(usageKey)) {
    r.usageKeys.add(usageKey);
    r.usages.push({ ...usage, kind });
  }
}
function parseHTML(content, usage, base, generated = false) {
  let inCode = 0;
  const ids = new Set();
  const parser = new Parser(
    {
      onopentag(name, a) {
        if (name === 'code' || name === 'pre') inCode++;
        if (a.id) ids.add(a.id);
        if (name === 'a' && a.name) ids.add(a.name);
        if (inCode) return;
        for (const [key, kind] of [
          ['href', 'link'],
          ['src', 'resource'],
          ['poster', 'resource'],
          ['action', 'form'],
        ]) {
          if (!a[key]) continue;
          if (key === 'href' && !['a', 'area', 'link'].includes(name)) continue;
          // Canonical and alternate discovery are metadata; include separately, not as navigation.
          const k = name === 'link' ? 'metadata' : kind;
          if (kind === 'form') {
            ignored.set(a[key], {
              url: a[key],
              reason: 'form submission is not a safe navigation probe',
              usages: [usage],
            });
            continue;
          }
          const line = generated
            ? 1
            : usage.line +
              content.slice(0, parser.startIndex).split('\n').length -
              1;
          add(a[key], { ...usage, line }, k, base);
        }
        if (a.srcset)
          for (const part of a.srcset.split(',')) {
            const src = part.trim().split(/\s+/)[0];
            if (src) add(src, usage, 'resource', base);
          }
      },
      onclosetag(name) {
        if (name === 'code' || name === 'pre') inCode = Math.max(0, inCode - 1);
      },
    },
    { decodeEntities: true },
  );
  parser.write(content);
  parser.end();
  return ids;
}
function parseMarkdown(content, usage, base) {
  const tokens = md.parse(content, {});
  function visit(tokens, line = 1) {
    for (const t of tokens) {
      let n = t.map ? t.map[0] + 1 : line;
      const u = {
        ...usage,
        line: n,
        sourceUrl: usage.keyPath
          ? usage.sourceUrl
          : usage.sourceUrl?.replace(/#L\d+$/, '') + `#L${n}`,
      };
      if (t.type === 'link_open') {
        const href = t.attrGet('href') || '';
        let pos = content.indexOf(href);
        if (pos < 0) {
          try {
            pos = content.indexOf(decodeURI(href));
          } catch {}
        }
        if (pos >= 0 && !usage.keyPath) {
          u.line = content.slice(0, pos).split('\n').length;
          u.sourceUrl = usage.sourceUrl?.replace(/#L\d+$/, '') + '#L' + u.line;
        }
        add(href, u, 'link', base);
      }
      if (t.type === 'image') add(t.attrGet('src') || '', u, 'resource', base);
      if (t.type === 'html_inline' || t.type === 'html_block')
        parseHTML(t.content, u, base);
      if (t.children) visit(t.children, n);
    }
  }
  visit(tokens);
  // Retain code-example URLs as excluded inventory; do not call example APIs.
  for (const t of tokens)
    if (t.type === 'fence' || t.type === 'code_block')
      for (const m of t.content.matchAll(/https?:\/\/[^\s"'`<>()[\]]+/g)) {
        const url = m[0];
        if (!ignored.has('code:' + url))
          ignored.set('code:' + url, {
            url,
            reason: 'code example; not a rendered navigation link',
            usages: [],
          });
        const r = ignored.get('code:' + url);
        if (r.usages.length < 30)
          r.usages.push({ ...usage, line: (t.map?.[0] || 0) + 1 });
      }
}
for (const build of builds) {
  const { version, dist } = build;
  for (const lang of ['en', 'zh']) {
    const dir = path.join(dist, lang, 'emqx-neuron', version);
    for (const file of walkFiles(dir, '.md')) {
      mdCount++;
      const rel = path.relative(dist, file).split(path.sep).join('/');
      const usage = sourceFor(build, rel);
      parseMarkdown(fs.readFileSync(file, 'utf8'), usage, usage.page);
    }
    for (const file of walkFiles(dir, '.html')) {
      htmlCount++;
      const rel = path.relative(dist, file).split(path.sep).join('/'),
        base = 'https://docs.emqx.com/' + rel;
      anchors.set(
        file,
        parseHTML(
          fs.readFileSync(file, 'utf8'),
          {
            version,
            page: base,
            kind: 'generated',
            source: file,
            line: 1,
            sourceUrl: null,
          },
          base,
          true,
        ),
      );
    }
    let specFile = path.join(
      build.sources,
      'redocly',
      `api-swagger-${lang}.json`,
    );
    if (!fs.existsSync(specFile))
      specFile = path.join(build.sources, 'redocly/api-swagger.json');
    if (fs.existsSync(specFile)) {
      const visit = (x, keys = []) => {
        if (!x || typeof x !== 'object') return;
        for (const [k, v] of Object.entries(x)) {
          const keyPath = [...keys, k].join('.'),
            usage = {
              version,
              page: `https://docs.emqx.com/${lang}/emqx-neuron/${version}/api/api-docs.html`,
              kind: 'openapi',
              source: specFile,
              line: 1,
              sourceUrl: specFile,
              keyPath,
            };
          if (typeof v === 'string' && k === 'description')
            parseMarkdown(v, usage, usage.page);
          else if (
            typeof v === 'string' &&
            k === 'url' &&
            ['externalDocs', 'contact', 'license'].includes(keys.at(-1))
          )
            add(v, usage, 'openapi', usage.page);
          else if (typeof v === 'object') visit(v, [...keys, k]);
        }
      };
      visit(JSON.parse(fs.readFileSync(specFile, 'utf8')));
    }
  }
  console.log(`Extracted ${version}; ${records.size} unique targets so far`);
}
// Generated theme navigation repeats on every page. Preserve full source occurrences but compact generated usages by version.
for (const r of records.values()) {
  const source = r.usages.filter((u) => u.sourceUrl),
    generated = r.usages.filter((u) => !u.sourceUrl);
  const counts = {};
  for (const u of generated) {
    const k = u.version + '|' + u.kind;
    if (!counts[k]) counts[k] = { ...u, occurrences: 0 };
    counts[k].occurrences++;
  }
  r.usages = [...source, ...Object.values(counts)];
  delete r.usageKeys;
  if (r.local) {
    r.local.status = r.local.exists
      ? 'LOCAL_OK'
      : r.kinds.every((k) => k === 'resource') &&
          r.usages.every((u) => u.sourceUrl) &&
          !r.needsHttp
        ? 'SOURCE_ASSET_REWRITTEN'
        : 'LOCAL_NOT_FOUND';
    r.local.missingFragments = r.local.exists
      ? r.fragments.filter(
          (h) =>
            !anchors.get(r.local.file)?.has(decodeURIComponent(h.slice(1))),
        )
      : [];
  }
  const old = new URL(r.url);
  if (old.hostname === 'docs.emqx.com' && old.pathname.includes('/neuronex/')) {
    old.pathname = old.pathname.replace('/neuronex/', '/emqx-neuron/');
    const candidate = localFor(old);
    r.migrationCandidate = {
      url: old.href,
      localExists: candidate?.exists ?? null,
    };
  }
}
const list = [...records.values()];
const inventory = {
  manifest,
  htmlPages: htmlCount,
  markdownPages: mdCount,
  targets: list,
  ignoredLinks: [...ignored.values()],
};
fs.writeFileSync(
  path.join(out, 'inventory.json'),
  JSON.stringify(inventory, null, 2),
);
const network = list.filter((r) => r.needsHttp);
console.log(
  `Inventory: ${list.length} unique targets, ${network.length} HTTP checks, ${ignored.size} excluded examples/schemes`,
);
if (args.includes('--inventory-only')) process.exit(0);
if (args.includes('--offline')) network.length = 0;
const checkpoint = path.join(out, 'http-results.jsonl');
let cache = new Map();
if (args.includes('--resume') && fs.existsSync(checkpoint))
  for (const line of fs.readFileSync(checkpoint, 'utf8').trim().split('\n')) {
    try {
      const r = JSON.parse(line);
      cache.set(r.url, r);
    } catch {}
  }
// BEGIN_HTTP
function classify(status) {
  if (status >= 200 && status < 400) return 'OK';
  if ([404, 410].includes(status)) return 'NOT_FOUND';
  if ([401, 403, 407, 429, 451].includes(status)) return 'BLOCKED';
  return 'BROKEN';
}
async function request(url, method) {
  const chain = [];
  let current = url;
  const controller = new AbortController(),
    timer = setTimeout(() => controller.abort(), timeout);
  try {
    for (let i = 0; i < 12; i++) {
      const u = new URL(current);
      const reason = skipReason(u, current);
      if (reason) throw Error('Redirect/request excluded: ' + reason);
      const res = await fetch(current, {
        method,
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'user-agent': 'emqx-docs-link-audit/1.0', accept: '*/*' },
      });
      const status = res.status,
        location = res.headers.get('location');
      await res.body?.cancel();
      chain.push({ url: current, status, location });
      if ([301, 302, 303, 307, 308].includes(status) && location) {
        current = new URL(location, current).href;
        continue;
      }
      return { status, finalUrl: current, chain };
    }
    throw Error('Redirect limit exceeded');
  } finally {
    clearTimeout(timer);
  }
}
async function check(record) {
  const attempts = [];
  let head = null,
    get = null;
  try {
    head = await request(record.url, 'HEAD');
    attempts.push({ method: 'HEAD', ...head });
  } catch (e) {
    attempts.push({
      method: 'HEAD',
      error: e.message + (e.cause?.code ? ' (' + e.cause.code + ')' : ''),
    });
  }
  if (!head || head.status >= 400) {
    for (let i = 0; i < 2; i++) {
      try {
        get = await request(record.url, 'GET');
        attempts.push({ method: 'GET', ...get });
        if (get.status < 500 && get.status !== 429) break;
      } catch (e) {
        attempts.push({
          method: 'GET',
          error: e.message + (e.cause?.code ? ' (' + e.cause.code + ')' : ''),
        });
      }
      if (i === 0) await new Promise((r) => setTimeout(r, 500));
    }
  }
  const final = get || head;
  let status = final ? classify(final.status) : 'ERROR';
  if (head?.status >= 400 && !get) status = 'UNVERIFIED';
  return {
    url: record.url,
    status,
    httpStatus: final?.status ?? null,
    finalUrl: final?.finalUrl ?? null,
    headStatus: head?.status ?? null,
    verification: get
      ? 'GET_FALLBACK'
      : head?.status < 400
        ? 'HEAD'
        : 'INCOMPLETE',
    attempts,
    checkedAt: new Date().toISOString(),
  };
}
// END_HTTP
(async () => {
  let next = 0,
    done = 0;
  const results = [];
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (next < network.length) {
        const r = network[next++];
        let result = cache.get(r.url);
        if (!result) {
          result = await check(r);
          fs.appendFileSync(checkpoint, JSON.stringify(result) + '\n');
        }
        results.push(result);
        done++;
        if (done % 50 === 0 || done === network.length)
          console.log(`HTTP ${done}/${network.length}: ${result.status}`);
      }
    }),
  );
  const byUrl = new Map(results.map((r) => [r.url, r]));
  for (const r of list) if (r.needsHttp) r.http = byUrl.get(r.url);
  const migrationChecks = [];
  for (const r of list.filter((r) => r.migrationCandidate)) {
    let result = cache.get(r.migrationCandidate.url);
    if (!result) {
      result = await check({ url: r.migrationCandidate.url });
      fs.appendFileSync(checkpoint, JSON.stringify(result) + '\n');
    }
    migrationChecks.push({
      originalUrl: r.url,
      candidateUrl: r.migrationCandidate.url,
      result,
    });
  }
  const counts = {};
  for (const r of results) counts[r.status] = (counts[r.status] || 0) + 1;
  const report = {
    generatedAt: new Date().toISOString(),
    reference:
      'emqx.com/.agents/skills/external-link-audit/scripts/audit-external-links.mjs',
    rules:
      'Deduplicate network URL, preserve query, remove fragment for HTTP; HEAD then GET fallback; bounded concurrency, redirects retained; blocked/unverified separate. No inherited user whitelists. Examples and non-HTTP schemes inventoried. Local artifacts checked independently of deployment.',
    manifest,
    migrationChecks,
    summary: {
      htmlPages: htmlCount,
      markdownPages: mdCount,
      uniqueTargets: list.length,
      httpChecked: results.length,
      httpStatus: counts,
      localMissing: list.filter((r) => r.local?.status === 'LOCAL_NOT_FOUND')
        .length,
      sourceAssetsRewritten: list.filter(
        (r) => r.local?.status === 'SOURCE_ASSET_REWRITTEN',
      ).length,
      missingAnchors: list.filter((r) => r.local?.missingFragments?.length)
        .length,
      ignored: ignored.size,
    },
    links: list,
    ignoredLinks: [...ignored.values()],
  };
  fs.writeFileSync(
    path.join(out, 'report.json'),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report.summary, null, 2));

  if (
    report.summary.localMissing ||
    report.summary.missingAnchors ||
    results.some((r) =>
      ['NOT_FOUND', 'BROKEN', 'ERROR', 'UNVERIFIED'].includes(r.status),
    )
  )
    process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
