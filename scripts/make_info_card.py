#!/usr/bin/env python3
"""
Generates info-card.svg -- a neofetch-style panel that fades/slides in
line by line, next to the ASCII wordmark.

Set STATIC=1 to emit a frozen (no-animation) frame for local previews.
"""
import os

OUT_PATH = "info-card.svg"
STATIC = os.environ.get("STATIC") == "1"

TITLE = "avanish@github"
# Keep values <= 40 chars: at FONT_SIZE 14 that's the room right of the key column.
ROWS = [
    ("Role", "Backend & Applied AI Engineer"),
    ("Edu", "B.E. CSE @ APSIT, Mumbai Univ. '28"),
    ("Community", "GDG On Campus Lead @ APSIT '25-26"),
    ("Google", "Student Ambassador '26 (Gemini)"),
    ("Research", "Paper under review @ MethodsX (Elsevier)"),
    ("Focus", "Autonomous agents · distributed systems"),
    ("AI/ML", "PyTorch · LangGraph · pykan · XGBoost"),
    ("Backend", "Python · FastAPI · Redis · TypeScript"),
    ("Infra", "Docker · Kubernetes · Helm"),
    ("Building", "KAN-KubeAgent · FluxGuard · DemandFlow"),
    ("Location", "Mumbai, India"),
]

KEY_COLOR = "#39d353"
VAL_COLOR = "#c9d1d9"
DIM_COLOR = "#8b949e"
BG = "#0d1117"
BORDER = "#30363d"
TITLE_COLOR = "#58a6ff"

FONT_SIZE = 14
ROW_H = 28
PAD_X = 22
PAD_TOP = 54
STAGGER = 0.14
DUR = 0.45


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_svg():
    too_long = [k for k, v in ROWS if len(v) > 40]
    if too_long:
        raise SystemExit(f"values too long for the card: {too_long}")
    width = 490
    height = PAD_TOP + ROW_H * len(ROWS) + 26

    parts = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}">'
    )
    parts.append(
        f'<style>'
        f'.mono{{font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;}}'
        f'.title{{font-size:14px;fill:{DIM_COLOR};}}'
        f'.key{{font-size:{FONT_SIZE}px;fill:{KEY_COLOR};font-weight:bold;}}'
        f'.val{{font-size:{FONT_SIZE}px;fill:{VAL_COLOR};}}'
        f'</style>'
    )

    # window chrome
    parts.append(
        f'<rect x="0" y="0" width="{width}" height="{height}" rx="10" '
        f'fill="{BG}" stroke="{BORDER}" stroke-width="1.5" />'
    )
    parts.append(f'<rect x="0" y="0" width="{width}" height="34" rx="10" fill="{BG}" />')
    parts.append(f'<rect x="0" y="24" width="{width}" height="10" fill="{BG}" />')
    parts.append(f'<line x1="0" y1="34" x2="{width}" y2="34" stroke="{BORDER}" stroke-width="1" />')
    for i, c in enumerate(["#ff5f56", "#ffbd2e", "#27c93f"]):
        parts.append(f'<circle cx="{20 + i * 18}" cy="17" r="6" fill="{c}" />')
    parts.append(f'<text x="{width / 2:.0f}" y="21" text-anchor="middle" class="mono title">{TITLE}</text>')

    for i, (key, val) in enumerate(ROWS):
        y = PAD_TOP + i * ROW_H
        row_group_attrs = ""
        if not STATIC:
            begin = round(0.1 + i * STAGGER, 3)
            anim = (
                f'<animate attributeName="opacity" from="0" to="1" begin="{begin}s" '
                f'dur="{DUR}s" fill="freeze" />'
                f'<animateTransform attributeName="transform" type="translate" '
                f'from="-14 0" to="0 0" begin="{begin}s" dur="{DUR}s" fill="freeze" '
                f'calcMode="spline" keySplines="0.25 0.1 0.25 1" />'
            )
            parts.append(f'<g opacity="0">')
            parts.append(
                f'  <text x="{PAD_X}" y="{y}" class="mono key">{esc(key)}</text>'
                f'  <text x="{PAD_X + 108}" y="{y}" class="mono val">{esc(val)}</text>'
            )
            parts.append(f'  {anim}')
            parts.append('</g>')
        else:
            parts.append(
                f'<text x="{PAD_X}" y="{y}" class="mono key">{esc(key)}</text>'
            )
            parts.append(
                f'<text x="{PAD_X + 108}" y="{y}" class="mono val">{esc(val)}</text>'
            )

    parts.append('</svg>')
    return "\n".join(parts)


def main():
    svg = build_svg()
    with open(OUT_PATH, "w") as f:
        f.write(svg)
    print(f"wrote {OUT_PATH} ({'static' if STATIC else 'animated'})")


if __name__ == "__main__":
    main()
