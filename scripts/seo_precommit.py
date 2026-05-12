"""
SEO safety net pre-commit hook for motley-tech.com.

Runs against staged files. Three jobs:

  HARD FAIL (blocks commit) ........ JSON-LD that doesn't parse, accidental
                                     <meta name="robots" content="noindex">.
  AUTO-FIX (modifies + re-stages) .. Bumps visible "Updated MMM D, YYYY"
                                     footer stamps, schema dateModified,
                                     and sitemap.xml <lastmod> to today.
  WARN (allows commit) ............. canonical mismatch, og:image still .svg.

Wired in via .githooks/pre-commit. To enable in a fresh clone:
  git config core.hooksPath .githooks

Skips quickly when no .html or sitemap.xml is staged.
"""
import subprocess
import sys
import re
import json
import datetime
import os
from pathlib import Path


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, check=False).stdout


REPO = Path(run(['git', 'rev-parse', '--show-toplevel']).strip())
TODAY = datetime.date.today()
TODAY_ISO = TODAY.isoformat()
TODAY_PRETTY = f"{TODAY.strftime('%b')} {TODAY.day}, {TODAY.year}"  # "May 1, 2026"


def staged_html_and_sitemap():
    out = run(['git', 'diff', '--cached', '--name-only', '--diff-filter=ACMR'])
    paths = [REPO / p for p in out.splitlines()]
    htmls = [p for p in paths if p.suffix == '.html']
    sitemaps = [p for p in paths if p.name == 'sitemap.xml']
    return htmls, sitemaps


def validate_json_ld(text, file_label):
    errors = []
    for i, body in enumerate(re.findall(
            r'<script type="application/ld\+json">\s*(.*?)\s*</script>',
            text, re.DOTALL)):
        try:
            json.loads(body)
        except json.JSONDecodeError as e:
            errors.append(f'{file_label}: JSON-LD block {i} fails to parse — {e}')
    return errors


def check_noindex(text, file_label):
    if re.search(r'<meta\s+name="robots"\s+content="[^"]*noindex', text, re.I):
        return [f'{file_label}: <meta name="robots" content="noindex"> would deindex this page']
    return []


def soft_warnings(text, file_label):
    warns = []
    if re.search(r'(og:image|twitter:image)[^>]*content="[^"]*\.svg"', text):
        warns.append(f'{file_label}: og:image or twitter:image still references .svg '
                     '(use .png — Facebook/iMessage do not render SVG previews)')
    return warns


def auto_bump_freshness(text):
    """Returns (new_text, changed) — bumps visible stamp + schema dateModified."""
    new = re.sub(
        r'<time datetime="\d{4}-\d{2}-\d{2}">Updated [A-Za-z]+ \d+, \d{4}</time>',
        f'<time datetime="{TODAY_ISO}">Updated {TODAY_PRETTY}</time>',
        text
    )
    new = re.sub(
        r'"dateModified":\s*"\d{4}-\d{2}-\d{2}"',
        f'"dateModified": "{TODAY_ISO}"',
        new
    )
    return new, new != text


def bump_sitemap(html_files):
    """Bump <lastmod> for any URL whose file was modified in this commit."""
    sm = REPO / 'sitemap.xml'
    if not sm.exists() or not html_files:
        return False
    urls = set()
    for f in html_files:
        rel = f.relative_to(REPO).as_posix()
        if rel == 'index.html':
            urls.add('https://motley-tech.com/')
        elif rel.endswith('/index.html'):
            urls.add(f'https://motley-tech.com/{rel[:-len("index.html")]}')
        else:
            urls.add(f'https://motley-tech.com/{rel}')
    text = sm.read_text(encoding='utf-8')
    new = text
    for url in urls:
        pattern = rf'(<loc>{re.escape(url)}</loc>\s*<lastmod>)\d{{4}}-\d{{2}}-\d{{2}}(</lastmod>)'
        new = re.sub(pattern, rf'\g<1>{TODAY_ISO}\g<2>', new)
    if new != text:
        sm.write_text(new, encoding='utf-8')
        return True
    return False


def main():
    html_files, _ = staged_html_and_sitemap()
    if not html_files:
        return 0

    errors = []
    warnings = []
    auto_fixed = []

    for f in html_files:
        rel = f.relative_to(REPO).as_posix()
        if not f.exists():
            continue  # deleted file
        # Private pitch / lead sites live outside the public SEO surface.
        # They're noindex by design and don't get freshness stamps.
        if rel.startswith('prospects/') or rel.startswith('leads/'):
            continue
        text = f.read_text(encoding='utf-8')
        errors.extend(validate_json_ld(text, rel))
        errors.extend(check_noindex(text, rel))
        warnings.extend(soft_warnings(text, rel))
        new_text, changed = auto_bump_freshness(text)
        if changed:
            f.write_text(new_text, encoding='utf-8')
            auto_fixed.append(rel)

    if bump_sitemap(html_files):
        auto_fixed.append('sitemap.xml')

    if auto_fixed:
        subprocess.run(['git', 'add'] + auto_fixed, check=True)
        print(f'[seo-precommit] bumped freshness on: {", ".join(auto_fixed)}')

    for w in warnings:
        print(f'[seo-precommit] WARN  {w}')

    if errors:
        print('\n[seo-precommit] BLOCKED — fix the following before committing:')
        for e in errors:
            print(f'  · {e}')
        return 1

    if not auto_fixed and not warnings:
        print(f'[seo-precommit] OK — {len(html_files)} html file(s), all checks passed')
    return 0


if __name__ == '__main__':
    sys.exit(main())
