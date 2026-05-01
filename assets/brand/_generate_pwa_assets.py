"""
One-shot generator for PWA + social-share PNG assets from the canonical SVGs.
Run when the SVGs change. Output paths committed to repo.
"""
import resvg_py
from pathlib import Path

ROOT = Path(__file__).parent
WIN_FONTS = "C:/Windows/Fonts"

ICON_SIZES = [180, 192, 256, 512, 1024]
for size in ICON_SIZES:
    out = ROOT / f"icon-{size}.png"
    data = resvg_py.svg_to_bytes(
        svg_path=str(ROOT / "favicon.svg"),
        width=size,
        height=size,
        font_dirs=[WIN_FONTS],
        sans_serif_family="Segoe UI",
    )
    out.write_bytes(bytes(data))
    print(f"wrote {out.name} ({size}x{size}, {len(data)} bytes)")

out = ROOT / "og-image.png"
data = resvg_py.svg_to_bytes(
    svg_path=str(ROOT / "og-image.svg"),
    width=1200,
    height=630,
    font_dirs=[WIN_FONTS],
    sans_serif_family="Segoe UI",
    monospace_family="Consolas",
)
out.write_bytes(bytes(data))
print(f"wrote {out.name} (1200x630, {len(data)} bytes)")
