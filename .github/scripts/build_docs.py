"""Build one version from committed sources; shared by local verification and CI."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


def run(argv, cwd, **kwargs):
    return subprocess.run(argv, cwd=cwd, check=True, **kwargs)


def git(repo, *args):
    return subprocess.check_output(['git', '-C', str(repo), *args], text=True).strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--frontend', type=Path, required=True)
    parser.add_argument('--version', required=True)
    args = parser.parse_args()
    source, frontend, version = args.source.resolve(), args.frontend.resolve(), args.version
    if not re.fullmatch(r'latest|v\d+(?:\.\d+)*', version):
        parser.error('version must be latest or a numeric version tag')
    product = 'emqx-neuron'
    docs = frontend / 'docs'
    for lang, folder in [('en', 'en_US'), ('zh', 'zh_CN')]:
        shutil.rmtree(docs / lang, ignore_errors=True)
        shutil.copytree(source / folder, docs / lang / product / version)
    shutil.rmtree(docs / 'ja', ignore_errors=True)
    shutil.rmtree(docs / '.vitepress/dist', ignore_errors=True)
    for file in docs.glob('*.md'):
        file.unlink()
    shutil.copyfile(source / 'directory.json', docs / '.vitepress/config/directory.json')
    api = docs / 'public/api'
    api.mkdir(exist_ok=True)
    tags = [t for t in git(source, 'tag', '--sort=-version:refname').splitlines()
            if re.fullmatch(r'v\d+(?:\.\d+)*', t)]
    versions = subprocess.check_output(['python3', str(source / '.github/scripts/generate_version.py'), *tags], text=True)
    (api / f'{product}_versions.json').write_text(versions)
    redoc = frontend / 'redoc'
    for file in redoc.glob('*.json'):
        file.unlink()
    for file in (source / 'redocly').glob('*.json'):
        shutil.copyfile(file, redoc / file.name)
    env = dict(os.environ, DOCS_TYPE=product, VERSION=version, DOCS_BRANCH=version)
    env.pop('DOCS_HOME', None)
    env.pop('BASE_URL', None)
    run(['pnpm', 'build'], frontend, env=env)
    dist = docs / '.vitepress/dist'
    specs = {}
    for lang in ['en', 'zh']:
        spec = redoc / f'api-swagger-{lang}.json'
        if not spec.exists():
            spec = redoc / 'api-swagger.json'
        if not spec.exists():
            raise FileNotFoundError(f'No API spec for {lang}')
        specs[lang] = {'path': spec.name, 'sha256': hashlib.sha256(spec.read_bytes()).hexdigest()}
        cmd = ['pnpm', 'exec', 'redocly', 'build-docs', str(spec), '--output',
               str(dist / lang / product / version / 'api/api-docs.html'),
               '--theme.openapi.theme.colors.primary.main=#00b173',
               '--theme.openapi.theme.typography.headings.fontFamily=Roboto, sans-serif']
        if spec.name != 'api-swagger.json':
            cmd += ['-t', 'redoc/template.hbs', '--templateOptions.neuronex', 'true',
                    '--templateOptions.version', version, '--templateOptions.title', f'EMQX Neuron {version} API Documentation']
            if lang == 'zh':
                cmd += ['--templateOptions.langZH', 'zh']
        run(cmd, frontend, env=env)
    provenance = {'version': version, 'docs_commit': git(source, 'rev-parse', 'HEAD'),
                  'frontend_commit': git(frontend, 'rev-parse', 'HEAD'),
                  'lockfile_sha256': hashlib.sha256((frontend / 'pnpm-lock.yaml').read_bytes()).hexdigest(),
                  'redoc_specs': specs}
    (frontend / 'build-provenance.json').write_text(json.dumps(provenance, indent=2) + '\n')


if __name__ == '__main__':
    main()
