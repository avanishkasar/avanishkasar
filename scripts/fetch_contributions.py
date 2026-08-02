#!/usr/bin/env python3
"""
Fetches the public contribution calendar HTML fragment GitHub itself uses
for profile pages -- no GraphQL API, no personal access token needed.
Writes data/contributions.json with raw days + derived stats.
"""
import json
import os
import re
import sys
from datetime import datetime

import requests
from bs4 import BeautifulSoup

USERNAME = os.environ.get("GH_USERNAME", "avanishkasar")
URL = f"https://github.com/users/{USERNAME}/contributions"
OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "contributions.json")


def fetch_days():
    headers = {"User-Agent": "Mozilla/5.0 (profile-readme-bot)"}
    resp = requests.get(URL, headers=headers, timeout=20)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # Current GitHub markup: <td class="ContributionCalendar-day" data-date data-level id=...>
    # plus a sibling <tool-tip for="<id>"> whose text is either
    # "No contributions on <Month Day>." or "<N> contributions on <Month Day>."
    tooltip_by_for = {}
    for tip in soup.select("tool-tip"):
        target = tip.get("for")
        if target:
            tooltip_by_for[target] = tip.get_text(strip=True)

    days = []
    cells = soup.select("td.ContributionCalendar-day")
    for cell in cells:
        date = cell.get("data-date")
        level = cell.get("data-level")
        if date is None:
            continue
        level = int(level) if level is not None else 0

        count = 0
        tip_text = tooltip_by_for.get(cell.get("id"))
        if tip_text:
            m = re.match(r"(\d+)\s+contributions?\s+on", tip_text)
            if m:
                count = int(m.group(1))
            elif tip_text.lower().startswith("no contributions"):
                count = 0

        days.append({"date": date, "level": level, "count": count})

    return days


def derive_stats(days):
    if not days:
        return {}
    days_sorted = sorted(days, key=lambda d: d["date"])
    counts = [d["count"] for d in days_sorted if d["count"] is not None]
    total = sum(counts) if counts else None

    # streaks based on level > 0 (fallback when count missing)
    def has_contribution(d):
        if d["count"] is not None:
            return d["count"] > 0
        return d["level"] > 0

    longest = cur = 0
    for d in days_sorted:
        if has_contribution(d):
            cur += 1
            longest = max(longest, cur)
        else:
            cur = 0

    current_streak = 0
    for d in reversed(days_sorted):
        if has_contribution(d):
            current_streak += 1
        else:
            break

    best_day = None
    if counts:
        best = max(days_sorted, key=lambda d: (d["count"] or 0))
        if (best["count"] or 0) > 0:
            best_day = {"date": best["date"], "count": best["count"]}

    return {
        "total_contributions": total,
        "current_streak": current_streak,
        "longest_streak": longest,
        "best_day": best_day,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }


def main():
    try:
        days = fetch_days()
    except Exception as e:
        print(f"fetch failed: {e}", file=sys.stderr)
        days = []

    stats = derive_stats(days)
    payload = {"username": USERNAME, "days": days, "stats": stats}

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w") as f:
        json.dump(payload, f, indent=2)

    print(f"wrote {OUT_PATH}: {len(days)} days, stats={stats}")


if __name__ == "__main__":
    main()
