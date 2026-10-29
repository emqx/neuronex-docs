"""Regression coverage for shared-file backups and explicit failure handling."""
import io
import json
from pathlib import Path
import tempfile
import unittest
from backup_s3 import affected_keys, copy_previous


class S3Error(Exception):
    def __init__(self, code):
        self.response = {'Error': {'Code': code}}


class S3:
    def __init__(self):
        self.prefixes = []
        self.objects = {'en/emqx-neuron/v3.9/removed.html': b'old page',
                        'api/emqx-neuron_versions.json': b'["latest","v3.9"]',
                        'sitemap_emqx-neuron_v3.9.xml': b'old sitemap',
                        'assets/shared.js': b'old shared asset',
                        'hashmap.json': b'old map'}

    def get_paginator(self, operation):
        assert operation == 'list_objects_v2'
        return self

    def paginate(self, Bucket, Prefix):
        self.prefixes.append(Prefix)
        yield {'Contents': [{'Key': key} for key in self.objects if key.startswith(Prefix)]}

    def get_object(self, Bucket, Key):
        if Key == 'denied':
            raise S3Error('AccessDenied')
        if Key not in self.objects:
            raise S3Error('NoSuchKey')
        return {'Body': io.BytesIO(self.objects[Key]), 'ContentType': 'text/plain', 'Metadata': {}}


class BackupTest(unittest.TestCase):
    def test_exact_affected_scope(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            dist = root / 'dist'
            for key in ['en/emqx-neuron/v3.9/new.html', 'api/emqx-neuron_versions.json',
                        'sitemap_emqx-neuron_v3.9.xml', 'assets/shared.js', 'hashmap.json']:
                file = dist / key
                file.parent.mkdir(parents=True, exist_ok=True)
                file.write_text('new')
            client = S3()
            keys = affected_keys(client, 'docs', dist, 'emqx-neuron', 'v3.9')
            self.assertEqual(set(keys), set(client.objects) | {'en/emqx-neuron/v3.9/new.html'})
            self.assertEqual(client.prefixes, ['en/emqx-neuron/v3.9/', 'zh/emqx-neuron/v3.9/'])
            output = root / 'backup'
            records = copy_previous(client, 'docs', keys, output, workers=2)
            self.assertEqual((output / 'objects/api/emqx-neuron_versions.json').read_bytes(), client.objects['api/emqx-neuron_versions.json'])
            self.assertTrue(json.loads((output / 'manifest.json').read_text())['complete'])
            self.assertEqual([r['key'] for r in records if not r['existed']], ['en/emqx-neuron/v3.9/new.html'])

    def test_permission_failure_is_not_treated_as_missing(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaises(S3Error):
                copy_previous(S3(), 'docs', ['denied'], Path(tmp))
            self.assertFalse(json.loads((Path(tmp) / 'manifest.json').read_text())['complete'])


if __name__ == '__main__':
    unittest.main()
