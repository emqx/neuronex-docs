"""Check sidebar source files without deleting documents that are not in the sidebar.

Generated HTML links, resources and anchors are checked by check-links.cjs after build.
"""
import json
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


def check(directory_file, root):
    errors = []
    config = json.loads(directory_file.read_text())

    def walk(items, folder):
        for item in items:
            target = item.get('path')
            if target:
                url = urlsplit(target)
                if not url.scheme and not target.startswith(('#', '/')):
                    relative = unquote(url.path).removeprefix('./')
                    if not relative or relative.endswith('/'):
                        relative += 'index'
                    if not relative.endswith('.md'):
                        relative += '.md'
                    file = root / folder / relative
                    if not file.is_file():
                        errors.append(f'Missing sidebar source: {folder}/{relative}')
            walk(item.get('children', []), folder)

    walk(config['en'], 'en_US')
    walk(config['cn'], 'zh_CN')
    return errors


if __name__ == '__main__':
    root = Path(sys.argv[2]).resolve()
    errors = check(root / sys.argv[1], root)
    print('\n'.join(errors) if errors else 'Sidebar source check passed (read-only).')
    raise SystemExit(bool(errors))
