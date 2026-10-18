#!/usr/bin/env python3
"""
Fetches the public contribution calendar HTML fragment GitHub itself uses
for profile pages -- no GraphQL API, no personal access token needed.
Writes data/contributions.json with raw days + derived stats.

GitHub's own `data-level` (0-4) is stored per day and is what the renderer
colours by, so the heatmap shades match the real profile graph exactly.

Exits non-zero (leaving the previous JSON untouched) if the fetch or parse
fails, so a GitHub markup change or outage never commits a blank graph.
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from datetime import date, datetime, timedelta, timezone
from typing import Any, TypedDict

import requests
from bs4 import BeautifulSoup

USERNAME = os.environ.get("GH_USERNAME", "avanishkasar")
URL = f"https://github.com/users/{USERNAME}/contributions"
OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "contributions.json")

MIN_DAYS = 360  # a full calendar is 365-371 cells; anything less means a broken parse
RETRIES = 4
TIMEOUT_S = 20

COUNT_RE = re.compile(r"([\d,]+)\s+contributions?\s+on", re.IGNORECASE)
TOTAL_RE = re.compile(r"([\d,]+)\s+contributions?", re.IGNORECASE)


class Day(TypedDict):
    date: str
    level: int
    count: int


class FetchError(RuntimeError):
    pass


def fetch_html() -> str:
    headers = {"User-Agent": "Mozilla/5.0 (profile-readme-bot)", "Accept": "text/html"}
    last_err: Exception | None = None
    for attempt in range(RETRIES):
        try:
            resp = requests.get(URL, headers=headers, timeout=TIMEOUT_S)
            if resp.status_code == 429 or resp.status_code >= 500:
                raise FetchError(f"HTTP {resp.status_code}")
            resp.raise_for_status()
            return resp.text
        except (requests.RequestException, FetchError) as e:
            last_err = e
            if attempt < RETRIES - 1:
                time.sleep(2 ** (attempt + 1))
    raise FetchError(f"giving up after {RETRIES} attempts: {last_err}")


def parse(html: str) -> tuple[list[Day], int | None]:
    soup = BeautifulSoup(html, "html.parser")

    # <td class="ContributionCalendar-day" data-date data-level id=...> plus a
    # sibling <tool-tip for="<id>"> reading "No contributions on <date>." or
    # "<N> contributions on <date>."
    tooltip_by_for = {
        tip["for"]: tip.get_text(strip=True) for tip in soup.select("tool-tip[for]")
    }

    days: list[Day] = []
    for cell in soup.select("td.ContributionCalendar-day[data-date]"):
        level = int(cell.get("data-level") or 0)
        count = 0
        m = COUNT_RE.search(tooltip_by_for.get(cell.get("id"), ""))
        if m:
            count = int(m.group(1).replace(",", ""))
        elif level > 0:
            count = 1  # tooltip missing but GitHub says there was activity
        days.append({"date": cell["data-date"], "level": max(0, min(level, 4)), "count": count})

    # The calendar table is row-major (one row per weekday); store chronologically.
    days.sort(key=lambda d: d["date"])

    # Authoritative header, e.g. "848 contributions in the last year". This
    # includes private contributions when the profile setting is on.
    total: int | None = None
    header = soup.select_one("#js-contribution-activity-description") or soup.find("h2")
    if header:
        m = TOTAL_RE.search(header.get_text(" ", strip=True))
        if m:
            total = int(m.group(1).replace(",", ""))
    return days, total


def derive_stats(days: list[Day], header_total: int | None) -> dict[str, Any]:
    active = [d["count"] > 0 or d["level"] > 0 for d in days]

    longest = cur = 0
    for a in active:
        cur = cur + 1 if a else 0
        longest = max(longest, cur)

    # GitHub-style current streak: an empty *today* doesn't break it yet.
    tail = list(active)
    if tail and not tail[-1]:
        tail.pop()
    current = 0
    for a in reversed(tail):
        if not a:
            break
        current += 1

    best = max(days, key=lambda d: d["count"], default=None)
    return {
        "total_contributions": header_total if header_total is not None else sum(d["count"] for d in days),
        "current_streak": current,
        "longest_streak": longest,
        "best_day": {"date": best["date"], "count": best["count"]} if best and best["count"] > 0 else None,
        "range": {"start": days[0]["date"], "end": days[-1]["date"]} if days else None,
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
    }


def validate(days: list[Day]) -> None:
    if len(days) < MIN_DAYS:
        raise FetchError(f"parsed only {len(days)} days (expected >= {MIN_DAYS}); markup changed?")
    last = date.fromisoformat(days[-1]["date"])
    # GitHub renders in the viewer's TZ; allow a day of skew either way.
    if abs((last - datetime.now(timezone.utc).date()).days) > 2:
        raise FetchError(f"calendar ends {last}, expected ~today; stale response?")
    dates = [date.fromisoformat(d["date"]) for d in days]
    if any(b - a != timedelta(days=1) for a, b in zip(dates, dates[1:])):
        raise FetchError("calendar has gaps or duplicate dates")


def main() -> int:
    try:
        days, header_total = parse(fetch_html())
        validate(days)
    except Exception as e:  # noqa: BLE001 -- surface any failure as a failed CI step
        print(f"fetch failed, keeping previous {OUT_PATH}: {e}", file=sys.stderr)
        return 1

    summed = sum(d["count"] for d in days)
    if header_total is not None and header_total != summed:
        print(f"note: header total {header_total} != per-day sum {summed} (private/hidden activity)")

    payload = {"username": USERNAME, "days": days, "stats": derive_stats(days, header_total)}
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    tmp = OUT_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
        f.write("\n")
    os.replace(tmp, OUT_PATH)  # atomic: never leave a half-written JSON behind

    print(f"wrote {OUT_PATH}: {len(days)} days, stats={payload['stats']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
