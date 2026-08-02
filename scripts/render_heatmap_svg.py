#!/usr/bin/env python3
"""
Renders data/contributions.json as a 53-week x 7-day heatmap SVG that
reveals itself with a diagonal, line-after-line slide-down (plays once
on load, then freezes).
"""
import json
import os
from datetime import date, datetime, timedelta

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "contributions.json")
OUT_PATH = "contrib-heatmap.svg"

PALETTE = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353", "#69f0a0"]

CELL = 11
GAP = 3
LEFT_PAD = 30
TOP_PAD = 34
BOTTOM_PAD = 40
STAGGER = 0.012
DUR = 0.35


def load_data():
    with open(DATA_PATH) as f:
        return json.load(f)


def bucket_level(count, max_count):
    if count <= 0:
        return 0
    if max_count <= 0:
        return 1
    ratio = count / max_count
    if ratio > 0.75:
        return 5
    if ratio > 0.5:
        return 4
    if ratio > 0.25:
        return 3
    return 2


def build_weeks(days):
    by_date = {d["date"]: d for d in days}
    if not days:
        return []
    all_dates = sorted(by_date.keys())
    start = datetime.strptime(all_dates[0], "%Y-%m-%d").date()
    end = datetime.strptime(all_dates[-1], "%Y-%m-%d").date()

    # align start back to the preceding Sunday
    start -= timedelta(days=(start.weekday() + 1) % 7)

    weeks = []
    cur_week = []
    cursor = start
    while cursor <= end:
        key = cursor.strftime("%Y-%m-%d")
        entry = by_date.get(key, {"count": 0, "level": 0})
        cur_week.append({"date": key, "count": entry.get("count", 0)})
        if cursor.weekday() == 5:  # Saturday closes the week (Sun-Sat)
            weeks.append(cur_week)
            cur_week = []
        cursor += timedelta(days=1)
    if cur_week:
        weeks.append(cur_week)
    return weeks


MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def month_labels(weeks):
    labels = []
    last_month = None
    for wi, week in enumerate(weeks):
        d = datetime.strptime(week[0]["date"], "%Y-%m-%d").date()
        if d.month != last_month:
            labels.append((wi, MONTH_ABBR[d.month - 1]))
            last_month = d.month
    return labels


def build_svg(payload):
    days = payload.get("days", [])
    stats = payload.get("stats", {})
    weeks = build_weeks(days)
    max_count = max((d["count"] for w in weeks for d in w), default=0)

    n_weeks = len(weeks)
    width = LEFT_PAD + n_weeks * (CELL + GAP) + 20
    height = TOP_PAD + 7 * (CELL + GAP) + BOTTOM_PAD

    parts = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}">'
    )
    parts.append(
        '<style>text{font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;'
        'fill:#8b949e;font-size:11px;}</style>'
    )
    parts.append(f'<rect x="0" y="0" width="{width}" height="{height}" fill="transparent" />')

    for wi, mlabel in month_labels(weeks):
        x = LEFT_PAD + wi * (CELL + GAP)
        parts.append(f'<text x="{x}" y="{TOP_PAD - 10}">{mlabel}</text>')

    for wi, week in enumerate(weeks):
        for di, day in enumerate(week):
            level = bucket_level(day["count"], max_count)
            color = PALETTE[level]
            x = LEFT_PAD + wi * (CELL + GAP)
            y = TOP_PAD + di * (CELL + GAP)
            begin = round((wi + di * 0.3) * STAGGER * 6, 3)
            parts.append(
                f'<rect x="{x}" y="{y}" width="{CELL}" height="{CELL}" rx="2" ry="2" '
                f'fill="{color}" opacity="0">'
                f'<animate attributeName="opacity" from="0" to="1" begin="{begin}s" '
                f'dur="{DUR}s" fill="freeze" />'
                f'<animateTransform attributeName="transform" type="translate" '
                f'from="0 -6" to="0 0" begin="{begin}s" dur="{DUR}s" fill="freeze" '
                f'calcMode="spline" keySplines="0.25 0.1 0.25 1" />'
                f'<title>{day["date"]}: {day["count"]} contribution(s)</title>'
                f'</rect>'
            )

    # legend
    legend_y = height - 20
    legend_x = LEFT_PAD
    parts.append(f'<text x="{legend_x}" y="{legend_y + 9}">Less</text>')
    lx = legend_x + 34
    for c in PALETTE:
        parts.append(f'<rect x="{lx}" y="{legend_y}" width="{CELL}" height="{CELL}" rx="2" fill="{c}" />')
        lx += CELL + GAP
    parts.append(f'<text x="{lx + 4}" y="{legend_y + 9}">More</text>')

    total = stats.get("total_contributions")
    if total is not None:
        footer = f"{total} contributions in the last year"
        parts.append(f'<text x="{width - 20}" y="{legend_y + 9}" text-anchor="end">{footer}</text>')

    parts.append('</svg>')
    return "\n".join(parts)


def main():
    payload = load_data()
    svg = build_svg(payload)
    with open(OUT_PATH, "w") as f:
        f.write(svg)
    print(f"wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
