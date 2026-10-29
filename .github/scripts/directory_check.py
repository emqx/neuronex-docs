"""Validate sidebar configuration and source paths without modifying documents."""
import json
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


def check(directory_file, root):
    errors = []
    try:
        config = json.loads(directory_file.read_text())
    except (OSError, ValueError) as error:
        return [f'Invalid directory config: {error}']
    if not isinstance(config, dict):
        return ['Directory config must be an object']

    def walk(items, folder):
        if not isinstance(items, list):
            errors.append(f'{folder}: sidebar entries must be an array')
            return
        for item in items:
            if not isinstance(item, dict):
                errors.append(f'{folder}: sidebar entry must be an object')
                continue
            target = item.get('path')
            if target is not None and not isinstance(target, str):
                errors.append(f'{folder}: sidebar path must be a string')
            elif target:
                url = urlsplit(target)
                if not url.scheme and not target.startswith(('#', '/')):
                    relative = unquote(url.path).removeprefix('./')
                    if not relative or relative.endswith('/'):
                        relative += 'index'
                    if not relative.endswith('.md'):
                        relative += '.md'
                    file = (root / folder / relative).resolve()
                    if not file.is_relative_to(root / folder) or not file.is_file():
                        errors.append(f'Missing sidebar source: {folder}/{relative}')
            if 'children' in item:
                walk(item['children'], folder)

    walk(config.get('en'), 'en_US')
    walk(config.get('cn'), 'zh_CN')
    return errors


if __name__ == '__main__':
    root = Path(sys.argv[2]).resolve()
    errors = check(root / sys.argv[1], root)
    print('\n'.join(errors) if errors else 'Sidebar config and source check passed (read-only).')
    raise SystemExit(bool(errors))
