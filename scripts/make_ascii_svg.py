#!/usr/bin/env python3
"""
Generates avi-ascii.svg -- a monochrome, self-typing ASCII wordmark.

No source photo was supplied, so this renders a big-block ASCII wordmark
("AVANISH") instead of a photo-derived portrait -- the same fallback style
used for text-based ASCII headers. If you later want a real photo-derived
portrait, swap this script for one that downsamples an image to a
brightness->glyph ramp (see prep_photo.py-style pipeline) and feed it in.
"""
import pyfiglet

WORDMARK = "AVANISH"
FONT = "big"
CHAR_W = 11.6      # px per monospace column at FONT_SIZE
CHAR_H = 21        # px per row
FONT_SIZE = 20
FILL = "#c9d1d9"   # light gray, monochrome
BG = "transparent"
STAGGER = 0.11      # seconds between row starts
WIPE_DUR = 0.55     # seconds each row takes to type in

OUT_PATH = "avi-ascii.svg"


def render_lines():
    fig = pyfiglet.Figlet(font=FONT)
    text = fig.renderText(WORDMARK)
    lines = text.rstrip("\n").split("\n")
    # trim trailing blank lines but keep interior spacing
    while lines and lines[-1].strip() == "":
        lines.pop()
    return lines


def esc(s):
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def build_svg(lines):
    max_len = max(len(l) for l in lines)
    width = max_len * CHAR_W + 40
    height = len(lines) * CHAR_H + 50
    total_dur = STAGGER * len(lines) + WIPE_DUR

    parts = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" '
        f'width="{width:.0f}" height="{height:.0f}">'
    )
    parts.append(
        f'<style>text{{font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;'
        f'font-size:{FONT_SIZE}px;fill:{FILL};white-space:pre;}}</style>'
    )

    for i, line in enumerate(lines):
        row_w = max(len(line) * CHAR_W, 1)
        y = 30 + i * CHAR_H
        begin = round(i * STAGGER, 3)
        clip_id = f"clip{i}"
        parts.append(f'<clipPath id="{clip_id}">')
        parts.append(f'  <rect x="20" y="{y - CHAR_H + 6:.0f}" width="0" height="{CHAR_H}">')
        parts.append(
            f'    <animate attributeName="width" from="0" to="{row_w:.0f}" '
            f'begin="{begin}s" dur="{WIPE_DUR}s" fill="freeze" calcMode="spline" '
            f'keySplines="0.25 0.1 0.25 1" />'
        )
        parts.append('  </rect>')
        parts.append('</clipPath>')
        parts.append(f'<g clip-path="url(#{clip_id})">')
        parts.append(f'  <text x="20" y="{y}">{esc(line)}</text>')
        parts.append('</g>')
        # small cursor block riding the wipe edge, fades out once the row is done
        cursor_id = f"cursor{i}"
        parts.append(
            f'<rect id="{cursor_id}" x="20" y="{y - CHAR_H + 6:.0f}" width="7" height="{CHAR_H - 4}" '
            f'fill="{FILL}" opacity="0">'
        )
        parts.append(
            f'  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.01;0.9;1" '
            f'begin="{begin}s" dur="{WIPE_DUR}s" fill="freeze" />'
        )
        parts.append(
            f'  <animate attributeName="x" from="20" to="{20 + row_w:.0f}" '
            f'begin="{begin}s" dur="{WIPE_DUR}s" fill="freeze" calcMode="spline" '
            f'keySplines="0.25 0.1 0.25 1" />'
        )
        parts.append('</rect>')

    parts.append('</svg>')
    return "\n".join(parts)


def main():
    lines = render_lines()
    svg = build_svg(lines)
    with open(OUT_PATH, "w") as f:
        f.write(svg)
    print(f"wrote {OUT_PATH} ({len(lines)} rows)")


if __name__ == "__main__":
    main()
