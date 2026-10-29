"""Copy objects affected by this deployment without comparing or syncing the site.

Back up every existing object under the version prefixes that deployment deletes,
plus every shared key the generated dist will overwrite. Only those two version
prefixes are listed; shared objects are fetched directly from the dist manifest.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import shutil


def affected_keys(client, bucket, dist, product, version):
    keys = {p.relative_to(dist).as_posix() for p in dist.rglob('*') if p.is_file()}
    for lang in ['en', 'zh']:
        prefix = f'{lang}/{product}/{version}/'
        for page in client.get_paginator('list_objects_v2').paginate(Bucket=bucket, Prefix=prefix):
            keys.update(o['Key'] for o in page.get('Contents', []) if not o['Key'].endswith('/'))
    return sorted(keys)


def copy_previous(client, bucket, keys, output, workers=16):
    output = output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    records = []

    def copy(key):
        target = (output / 'objects' / key).resolve()
        if not target.is_relative_to(output / 'objects'):
            raise ValueError(f'Invalid object path: {key}')
        try:
            obj = client.get_object(Bucket=bucket, Key=key)
        except Exception as error:
            response = getattr(error, 'response', {})
            code = str(response.get('Error', {}).get('Code', ''))
            if code in ('NoSuchKey', '404', 'NotFound'):
                return {'key': key, 'existed': False}
            raise
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with target.open('wb') as file:
                shutil.copyfileobj(obj['Body'], file)
        finally:
            obj['Body'].close()
        return {'key': key, 'existed': True,
                'headers': {k: obj[k] for k in ('ContentType', 'ContentEncoding', 'CacheControl',
                                               'ContentDisposition', 'ContentLanguage', 'Metadata',
                                               'ETag', 'VersionId') if k in obj}}

    try:
        with ThreadPoolExecutor(max_workers=workers) as pool:
            for record in pool.map(copy, keys):
                records.append(record)
    finally:
        (output / 'manifest.json').write_text(json.dumps({
            'bucket': bucket, 'expected_objects': len(keys),
            'complete': len(records) == len(keys), 'objects': records,
        }, indent=2) + '\n')
    return records


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--bucket', required=True)
    parser.add_argument('--dist', type=Path, required=True)
    parser.add_argument('--product', required=True)
    parser.add_argument('--version', required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    import boto3
    from botocore.config import Config
    client = boto3.client('s3', config=Config(max_pool_connections=16,
                         retries={'mode': 'standard', 'max_attempts': 3}))
    keys = affected_keys(client, args.bucket, args.dist, args.product, args.version)
    records = copy_previous(client, args.bucket, keys, args.output)
    print(f'Backed up {sum(r["existed"] for r in records)} existing objects; '
          f'{sum(not r["existed"] for r in records)} deployment keys did not previously exist.')


if __name__ == '__main__':
    main()
