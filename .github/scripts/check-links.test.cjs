const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const checkerPath = path.join(__dirname, 'check-links.cjs');
const code = fs.readFileSync(checkerPath, 'utf8');
const segment = code.slice(
  code.indexOf('// BEGIN_HTTP'),
  code.indexOf('// END_HTTP'),
);
function checker(fetch) {
  return new Function(
    'fetch',
    'skipReason',
    'timeout',
    segment + ';return check;',
  )(fetch, () => null, 1000);
}
const response = (status, headers = {}) =>
  new Response(null, { status, headers });

(async () => {
  let check = checker(async (_url, { method }) =>
    response(method === 'HEAD' ? 404 : 200),
  );
  assert.equal((await check({ url: 'https://fixture.test/a' })).status, 'OK');
  check = checker(async () => response(404));
  assert.equal(
    (await check({ url: 'https://fixture.test/a' })).status,
    'NOT_FOUND',
  );
  check = checker(async () => response(403));
  assert.equal(
    (await check({ url: 'https://fixture.test/a' })).status,
    'BLOCKED',
  );
  check = checker(async (url) =>
    url.endsWith('/a') ? response(301, { location: '/b' }) : response(200),
  );
  const redirected = await check({ url: 'https://fixture.test/a' });
  assert.equal(redirected.finalUrl, 'https://fixture.test/b');
  assert.equal(redirected.attempts[0].chain.length, 2);
  check = checker(async (_url, { method }) => {
    if (method === 'HEAD') return response(404);
    throw Error('network failure');
  });
  assert.equal(
    (await check({ url: 'https://fixture.test/a' })).status,
    'UNVERIFIED',
  );
  check = checker(async () => {
    throw Error('network failure');
  });
  assert.equal(
    (await check({ url: 'https://fixture.test/a' })).status,
    'ERROR',
  );

  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-link-check-'));
  const write = (name, text) => {
    const file = path.join(fixture, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
  };
  try {
    const prefix = 'dist/en/emqx-neuron/v3.1/';
    write(
      prefix + 'index.md',
      '[relative](./target.md#ok)\n[absolute](https://docs.emqx.com/en/emqx-neuron/v3.1/missing.html)\n[reference][r]\n\n[r]: ./target.md#absent\n\n`main.py`\n\n```shell\ncurl https://example.org/api\n```\n\n[external](https://www.emqx.com/en?x=1&y=2)\n',
    );
    write(
      prefix + 'index.html',
      '<a href="./target.html#ok">target</a><img src="/assets/hashed.png">',
    );
    write(prefix + 'target.html', '<h2 id="ok">Target</h2>');
    write('dist/assets/hashed.png', 'asset');
    write(
      'sources/redocly/api-swagger.json',
      JSON.stringify({ info: { description: '[API reference](doc-123)' } }),
    );
    // An archived spec is not published and must not contribute spurious failures.
    write(
      'sources/redocly/old-api-swagger.json',
      JSON.stringify({ info: { description: '[obsolete](doc-old)' } }),
    );
    const frontend = process.argv[2];
    assert.ok(frontend, 'Pass the frontend directory as the first argument');
    execFileSync(process.execPath, [
      checkerPath,
      '--frontend',
      frontend,
      '--dist',
      path.join(fixture, 'dist'),
      '--sources',
      path.join(fixture, 'sources'),
      '--version',
      'v3.1',
      '--output',
      path.join(fixture, 'report'),
      '--inventory-only',
    ]);
    const inventory = JSON.parse(
      fs.readFileSync(path.join(fixture, 'report/inventory.json')),
    );
    const find = (suffix) =>
      inventory.targets.find((r) => r.url.endsWith(suffix));
    assert.equal(find('/target.html').local.status, 'LOCAL_OK');
    assert.deepEqual(find('/target.html').local.missingFragments, ['#absent']);
    assert.equal(find('/missing.html').local.status, 'LOCAL_NOT_FOUND');
    assert.equal(find('/api/doc-123').local.status, 'LOCAL_NOT_FOUND');
    assert.equal(find('/assets/hashed.png').local.status, 'LOCAL_OK');
    assert.equal(find('/api/doc-old'), undefined);
    assert.equal(find('http://main.py/'), undefined);
    assert.ok(find('?x=1&y=2').needsHttp);
    assert.ok(
      inventory.ignoredLinks.some((r) => r.url === 'https://example.org/api'),
    );
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
  console.log(
    'Passed: 6 HTTP scenarios and static Markdown/HTML/OpenAPI link fixtures',
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
