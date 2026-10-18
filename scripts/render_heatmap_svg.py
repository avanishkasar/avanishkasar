#!/usr/bin/env python3
"""
Renders data/contributions.json as a 53-week x 7-day heatmap SVG that
reveals itself with a diagonal, line-after-line slide-down (plays once
on load, then freezes).

Cells are coloured by GitHub's own per-day `data-level` (0-4) using
GitHub's Primer contribution palette, so shades match the real profile
graph 1:1. Light/dark palettes switch with prefers-color-scheme, which
GitHub honours for SVGs embedded via <img>.
"""
from __future__ import annotations

import json
import os
import sys
from datetime import date, timedelta
from typing import Any

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "contributions.json")
OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "contrib-heatmap.svg")

# Primer `contribution-default-bgColor-{0..4}` tokens (github.com, 2024+).
PALETTE_LIGHT = ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]
PALETTE_DARK = ["#151b23", "#033a16", "#196c2e", "#2ea043", "#56d364"]
TEXT_LIGHT = "#59636e"
TEXT_DARK = "#9198a1"
BORDER_LIGHT = "rgba(31,35,40,0.05)"
BORDER_DARK = "rgba(240,246,252,0.05)"

CELL = 11
GAP = 3
STEP = CELL + GAP
LEFT_PAD = 34
RIGHT_PAD = 10
TOP_PAD = 24
BOTTOM_PAD = 34
STAGGER = 0.072  # seconds per diagonal step
DUR = 0.35

MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
WEEKDAY_LABELS = {1: "Mon", 3: "Wed", 5: "Fri"}  # row index, Sun = 0


def load_data() -> dict[str, Any]:
    with open(DATA_PATH, encoding="utf-8") as f:
        return json.load(f)


def level_of(entry: dict[str, Any]) -> int:
    lvl = entry.get("level")
    if lvl is None:  # legacy JSON without levels
        return 1 if entry.get("count", 0) > 0 else 0
    return max(0, min(int(lvl), 4))


def build_weeks(days: list[dict[str, Any]]) -> list[list[dict[str, Any] | None]]:
    """Sun-Sat columns; padding cells before the first day are None (not drawn)."""
    if not days:
        return []
    by_date = {d["date"]: d for d in days}
    start = date.fromisoformat(min(by_date))
    end = date.fromisoformat(max(by_date))

    weeks: list[list[dict[str, Any] | None]] = []
    week: list[dict[str, Any] | None] = [None] * ((start.weekday() + 1) % 7)
    cursor = start
    while cursor <= end:
        key = cursor.isoformat()
        entry = by_date.get(key, {"count": 0, "level": 0})
        week.append({"date": key, "count": int(entry.get("count", 0)), "level": level_of(entry)})
        if len(week) == 7:
            weeks.append(week)
            week = []
        cursor += timedelta(days=1)
    if week:
        weeks.append(week)
    return weeks


def month_labels(weeks: list[list[dict[str, Any] | None]]) -> list[tuple[int, str]]:
    labels: list[tuple[int, str]] = []
    last_month: int | None = None
    for wi, week in enumerate(weeks):
        first = next(d for d in week if d is not None)
        m = date.fromisoformat(first["date"]).month
        if m != last_month:
            labels.append((wi, MONTH_ABBR[m - 1]))
            last_month = m
    # Like GitHub, drop a label that would collide with the next one.
    return [
        lab for i, lab in enumerate(labels)
        if i + 1 >= len(labels) or labels[i + 1][0] - lab[0] >= 3
    ]


def plural(n: int, word: str) -> str:
    return f"{n:,} {word}{'' if n == 1 else 's'}"


def css() -> str:
    def rules(pal: list[str], text: str, border: str) -> str:
        cells = "".join(f".l{i}{{fill:{c};}}" for i, c in enumerate(pal))
        return f"text{{fill:{text};}}rect.c{{stroke:{border};}}{cells}"

    return (
        "<style>"
        'text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif;'
        "font-size:10px;}"
        "rect.c{stroke-width:1;}"
        + rules(PALETTE_LIGHT, TEXT_LIGHT, BORDER_LIGHT)
        + "@media (prefers-color-scheme:dark){"
        + rules(PALETTE_DARK, TEXT_DARK, BORDER_DARK)
        + "}</style>"
    )


def build_svg(payload: dict[str, Any]) -> str:
    stats = payload.get("stats") or {}
    weeks = build_weeks(payload.get("days") or [])
    if not weeks:
        raise ValueError("no contribution days in data file")

    width = LEFT_PAD + len(weeks) * STEP - GAP + RIGHT_PAD
    height = TOP_PAD + 7 * STEP - GAP + BOTTOM_PAD

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}" role="img" aria-label="GitHub contribution graph">',
        css(),
    ]

    for wi, label in month_labels(weeks):
        parts.append(f'<text x="{LEFT_PAD + wi * STEP}" y="{TOP_PAD - 8}">{label}</text>')
    for di, label in WEEKDAY_LABELS.items():
        parts.append(f'<text x="0" y="{TOP_PAD + di * STEP + 9}">{label}</text>')

    for wi, week in enumerate(weeks):
        for di, day in enumerate(week):
            if day is None:
                continue
            x = LEFT_PAD + wi * STEP
            y = TOP_PAD + di * STEP
            begin = round((wi + di * 0.3) * STAGGER, 3)
            parts.append(
                f'<rect class="c l{day["level"]}" x="{x}" y="{y}" width="{CELL}" height="{CELL}" '
                f'rx="2" ry="2" opacity="0">'
                f'<animate attributeName="opacity" from="0" to="1" begin="{begin}s" '
                f'dur="{DUR}s" fill="freeze" />'
                f'<animateTransform attributeName="transform" type="translate" '
                f'from="0 -6" to="0 0" begin="{begin}s" dur="{DUR}s" fill="freeze" '
                f'calcMode="spline" keySplines="0.25 0.1 0.25 1" />'
                f'<title>{plural(day["count"], "contribution")} on {day["date"]}</title>'
                f"</rect>"
            )

    # footer: summary (left), legend (right) -- same layout as github.com
    fy = height - 12
    total = stats.get("total_contributions")
    if total is not None:
        summary = f"{plural(int(total), 'contribution')} in the last year"
        streak = stats.get("longest_streak")
        if streak:
            summary += f" · longest streak {plural(int(streak), 'day')}"
        parts.append(f'<text x="{LEFT_PAD}" y="{fy + 9}">{summary}</text>')

    lx = width - RIGHT_PAD - 5 * STEP - 28  # leaves room for "More"
    parts.append(f'<text x="{lx - 6}" y="{fy + 9}" text-anchor="end">Less</text>')
    for i in range(5):
        parts.append(
            f'<rect class="c l{i}" x="{lx + i * STEP}" y="{fy}" width="{CELL}" height="{CELL}" rx="2" ry="2" />'
        )
    parts.append(f'<text x="{lx + 5 * STEP + 3}" y="{fy + 9}">More</text>')

    parts.append("</svg>")
    return "\n".join(parts) + "\n"


def main() -> int:
    try:
        svg = build_svg(load_data())
    except (OSError, ValueError, KeyError) as e:
        print(f"render failed, keeping previous {OUT_PATH}: {e}", file=sys.stderr)
        return 1
    tmp = OUT_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(svg)
    os.replace(tmp, OUT_PATH)
    print(f"wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
