#!/usr/bin/env python3
"""Submit Always Tools URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep).

IndexNow is an instant-indexing ping protocol. One POST notifies all
participating engines that URLs changed; they then crawl on their own
schedule. It does NOT cover Google — use GSC "Request Indexing" for that
(see doc/seo-gsc-review-2026-11-03.md, action item #2).

Usage:
    python3 scripts/indexnow_submit.py            # submit every URL in sitemap.xml
    python3 scripts/indexnow_submit.py --guides   # submit only the 4 guide pages
    python3 scripts/indexnow_submit.py URL [URL…] # submit specific URLs
    python3 scripts/indexnow_submit.py --dry-run   # print payload, do not POST

The key file public/<KEY>.txt must be deployed and publicly reachable at
https://always.tools/<KEY>.txt before engines will accept the submission.
"""
import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

HOST = "always.tools"
KEY = "f47bbe25626d74389c6b8d9e6ad4b57d"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"

PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"

GUIDE_PATHS = [
    "/how-to-generate-uuid",
    "/uuid-v4-vs-v7",
    "/verify-md5-checksum",
    "/url-encoding-guide",
]


def sitemap_urls() -> list[str]:
    sm = (PUBLIC_DIR / "sitemap.xml").read_text(encoding="utf-8")
    return re.findall(r"<loc>([^<]+)</loc>", sm)


def main() -> int:
    ap = argparse.ArgumentParser(description="Submit URLs to IndexNow")
    ap.add_argument("urls", nargs="*", help="explicit URLs (default: all sitemap URLs)")
    ap.add_argument("--guides", action="store_true", help="only the 4 guide pages")
    ap.add_argument("--dry-run", action="store_true", help="print payload, do not POST")
    args = ap.parse_args()

    if args.guides:
        urls = [f"https://{HOST}{p}" for p in GUIDE_PATHS]
    elif args.urls:
        urls = args.urls
    else:
        urls = sitemap_urls()

    if not urls:
        print("No URLs to submit.", file=sys.stderr)
        return 1

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    body = json.dumps(payload).encode("utf-8")

    print(f"IndexNow → {ENDPOINT}")
    print(f"  host={HOST} key={KEY[:8]}… ({len(urls)} URLs)")
    for u in urls:
        print(f"    {u}")

    if args.dry_run:
        print("\n[dry-run] not submitting.")
        return 0

    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            code = resp.status
            text = resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        code = e.code
        text = e.read().decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        print(f"\nSubmission failed: {e}", file=sys.stderr)
        return 1

    # IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
    print(f"\nHTTP {code}  {text or '(empty body = accepted)'}")
    if code in (200, 202):
        print("Accepted. Engines will crawl on their own schedule.")
        return 0
    print("Rejected — check that the key file is live at", KEY_LOCATION, file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
