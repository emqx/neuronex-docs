const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { checkSources } = require('./check-links.cjs');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'neuron-source-check-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  function write(file, text = '') {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, text);
  }
  write('en_US/guide.md', '# Guide');
  write('zh_CN/index.md', '# 中文');
  write('en_US/image name.png');
  write('redocly/api-swagger.json', '{}');
  return { root, write };
}

test('relative, reference, HTML, same-version absolute links and generated API resolve without a frontend', (t) => {
  const { root, write } = fixture(t);
  write('en_US/index.md', [
    '[Guide](guide.md?view=1#section)', '[Reference][guide]', '[guide]: guide.html',
    '![Image](image%20name.png)', '<img src="image%20name.png">',
    '<a href="guide.html">HTML</a>',
    '[Absolute](https://docs.emqx.com/en/emqx-neuron/latest/guide.html)',
    '[Chinese](/zh/emqx-neuron/latest/)', '[API](api/api-docs.md#tag/plugins)',
  ].join('\n\n'));
  const result = checkSources(root);
  assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
  assert.equal(result.checked, 8);
});

test('missing relative, hardcoded same-version pages and image resources fail', (t) => {
  const { root, write } = fixture(t);
  write('en_US/index.md', [
    '[Broken](missing.md)', '![Image](missing.png)',
    '[Hardcoded](https://docs.emqx.com/en/emqx-neuron/latest/missing.html)',
    '<img srcset="missing-small.png 1x, missing-large.png 2x">',
  ].join('\n\n'));
  assert.equal(checkSources(root).errors.length, 5);
});

test('code, comments, fragments, external and cross-version URLs do not cause network requests or false failures', (t) => {
  const { root, write } = fixture(t);
  write('en_US/index.md', [
    '`[example](missing.md)`', '```md\n![Example](missing.png)\n```',
    '<!-- [Hidden](missing.md) -->', '<pre><a href="missing.md">example</a></pre>',
    '[Heading](#generated-heading)', '[External](https://example.org/missing)',
    '[History](/en/emqx-neuron/v3.5/guide.html)',
  ].join('\n\n'));
  const result = checkSources(root);
  assert.equal(result.errors.length, 0);
  assert.equal(result.checked, 0);
  assert.equal(result.skipped.length, 2);
});

test('invalid paths and missing generated API input fail', (t) => {
  const { root, write } = fixture(t);
  fs.unlinkSync(path.join(root, 'redocly/api-swagger.json'));
  write('en_US/index.md', '[API](api/api-docs.html)\n\n[Escape](../../../outside.md)\n\n[Encoding](bad%FF.md)');
  assert.equal(checkSources(root).errors.length, 3);
});

test('sidebar check rejects missing files and malformed config without deleting unlisted documents', (t) => {
  const { root, write } = fixture(t);
  const run = () => spawnSync('python3', [path.join(__dirname, 'directory_check.py'), 'directory.json', root], { encoding: 'utf8' });
  write('directory.json', JSON.stringify({ en: [{ path: 'guide' }], cn: [{ path: './' }] }));
  assert.equal(run().status, 0);
  assert.ok(fs.existsSync(path.join(root, 'en_US/image name.png')));
  write('en_US/unlisted.md', '# Keep me');
  write('directory.json', JSON.stringify({ en: [{ path: 'missing' }], cn: [] }));
  assert.equal(run().status, 1);
  assert.ok(fs.existsSync(path.join(root, 'en_US/unlisted.md')));
  write('directory.json', JSON.stringify({ en: 'invalid', cn: [] }));
  assert.equal(run().status, 1);
});
