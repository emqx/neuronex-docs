// Check source targets without a frontend checkout, secrets, a build, or network access.
// Generated anchors and cross-version/external destinations belong to the full build audit.
const fs = require('node:fs');
const path = require('node:path');
const MarkdownIt = require('markdown-it');
const { Parser } = require('htmlparser2');
const md = new MarkdownIt({ html: true, linkify: true });

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : entry.name.endsWith('.md') ? [file] : [];
  });
}

function checkSources(root, version = 'latest') {
  root = path.resolve(root);
  const errors = [];
  const skipped = new Set();
  let checked = 0;
  function check(raw, source, resource) {
    if (!raw || raw.startsWith('#')) return;
    // Leave templated configuration examples to the rendered-build audit.
    if (/\$\{|<[^>]+>|\{[^}]+\}/.test(raw.split('#')[0])) return;
    let url;
    const relative = path.relative(root, source).split(path.sep).join('/');
    const language = relative.startsWith('zh_CN/') ? 'zh' : 'en';
    const page = relative.replace(/^(en_US|zh_CN)\//, '').replace(/\.md$/, '.html');
    try {
      url = new URL(raw, `https://docs.emqx.com/${language}/emqx-neuron/${version}/${page}`);
    } catch {
      errors.push({ source: relative, target: raw, reason: 'Invalid URL' });
      return;
    }
    if (!['http:', 'https:'].includes(url.protocol)) return;
    const match = url.pathname.match(/^\/(en|zh)\/emqx-neuron\/([^/]+)\/(.*)$/);
    let target;
    try {
      if (url.hostname === 'docs.emqx.com' && match && match[2] === version) {
        target = path.join(root, match[1] === 'zh' ? 'zh_CN' : 'en_US', decodeURIComponent(match[3]));
        // API HTML is generated from this specification, not a Markdown page.
        if (/^api\/api-docs\.(?:html|md)$/.test(match[3])) {
          target = path.join(root, 'redocly', 'api-swagger.json');
        } else if (!resource) {
          if (target.endsWith('.html')) target = target.slice(0, -5) + '.md';
          else if (url.pathname.endsWith('/')) target = path.join(target, 'index.md');
          else if (!path.extname(target)) target += '.md';
        }
      } else if (!/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(raw)) {
        // A relative path that escaped the product/version directory is a source error.
        target = path.resolve(path.dirname(source), decodeURIComponent(raw.split(/[?#]/)[0]));
        if (!resource && target.endsWith('.html')) target = target.slice(0, -5) + '.md';
      } else {
        skipped.add(url.href);
        return;
      }
    } catch {
      errors.push({ source: relative, target: raw, reason: 'Invalid URL encoding' });
      return;
    }
    checked++;
    if (!target.startsWith(root + path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
      errors.push({ source: relative, target: raw, reason: 'Missing source target' });
    }
  }
  for (const folder of ['en_US', 'zh_CN']) {
    const dir = path.join(root, folder);
    if (!fs.existsSync(dir)) {
      errors.push({ source: folder, reason: 'Missing language directory' });
      continue;
    }
    for (const file of files(dir)) {
      let codeDepth = 0;
      const parser = new Parser({
        onopentag(name, attrs) {
          if (name === 'pre' || name === 'code') codeDepth++;
          if (codeDepth) return;
          if (['a', 'area', 'link'].includes(name)) check(attrs.href, file, false);
          check(attrs.src, file, true);
          check(attrs.poster, file, true);
          if (attrs.srcset && !attrs.srcset.startsWith('data:')) {
            for (const part of attrs.srcset.split(',')) check(part.trim().split(/\s+/)[0], file, true);
          }
        },
        onclosetag(name) {
          if (name === 'pre' || name === 'code') codeDepth = Math.max(0, codeDepth - 1);
        },
      }, { decodeEntities: true });
      parser.end(md.render(fs.readFileSync(file, 'utf8')));
    }
  }
  return { checked, skipped: [...skipped], errors };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
  const result = checkSources(option('--sources', '.'), option('--version', 'latest'));
  for (const error of result.errors) console.error(`${error.source}: ${error.reason}: ${error.target || ''}`);
  console.log(`Checked ${result.checked} source targets; ${result.errors.length} errors. ` +
    `Skipped ${result.skipped.length} external/cross-version/shared URLs; generated anchors are not checked.`);
  process.exitCode = result.errors.length ? 1 : 0;
}
module.exports = { checkSources };
