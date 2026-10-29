"""Validate the generated version, sidebar, metadata, API references and discovery files."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'meta':
            self.meta[attrs.get('name')] = attrs.get('content')


def verify(source, dist, version):
    errors = []
    pages = 0
    sidebar = 0
    for lang in ['en', 'zh']:
        base = dist / lang / 'emqx-neuron' / version
        for required in ['index.html', 'api/api-docs.html'] + (['llms.txt'] if lang == 'en' else []):
            if not (base / required).is_file():
                errors.append(f'Missing {lang}/{required}')
        for file in base.rglob('*.html'):
            pages += 1
            if file.name == 'api-docs.html':
                continue
            rel = file.relative_to(dist).as_posix()
            page = Page()
            page.feed(file.read_text())
            expected = 'https://docs.emqx.com/' + re.sub(r'/index.html$', '/', rel)
            if page.canonical != expected:
                errors.append(f'Wrong canonical: {rel}')
            if page.meta.get('docsearch:product') != 'emqx-neuron' or page.meta.get('docsearch:version') != version:
                errors.append(f'Wrong product/version metadata: {rel}')
            if not file.with_suffix('.md').is_file():
                errors.append(f'Missing raw Markdown: {rel}')
        def walk(items):
            nonlocal sidebar
            for item in items:
                target = item.get('path')
                if target:
                    u = urlsplit(target)
                    if u.netloc == 'docs.emqx.com':
                        file = dist / unquote(u.path).lstrip('/')
                    elif not u.scheme and not target.startswith('#'):
                        path = unquote(u.path).removeprefix('./').lstrip('/')
                        if not path or path.endswith('/'):
                            path += 'index.html'
                        elif path.endswith('.md'):
                            path = path[:-3] + '.html'
                        elif not path.endswith('.html'):
                            path += '.html'
                        file = base / path
                    else:
                        file = None
                    if file is not None:
                        sidebar += 1
                        if not file.is_file():
                            errors.append(f'Missing sidebar target: {lang}/{target}')
                walk(item.get('children', []))
        directory = json.loads((source / 'directory.json').read_text())
        walk(directory['cn' if lang == 'zh' else 'en'])
    sitemap = dist / f'sitemap_emqx-neuron_{version}.xml'
    if not sitemap.is_file():
        errors.append('Missing sitemap')
    else:
        ET.parse(sitemap)
        if '/neuronex/' in sitemap.read_text():
            errors.append('Old product path in sitemap')
    config = dist / 'api/emqx-neuron_versions.json'
    if not config.is_file() or 'latest' not in json.loads(config.read_text()):
        errors.append('Missing/invalid version list')
    return {'version': version, 'html_pages': pages, 'sidebar_targets': sidebar, 'errors': errors}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sources', type=Path, required=True)
    parser.add_argument('--dist', type=Path, required=True)
    parser.add_argument('--version', required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = verify(args.sources, args.dist, args.version)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result['errors']))
