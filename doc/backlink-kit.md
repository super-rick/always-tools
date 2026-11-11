# Backlink & Directory Submission Kit

GSC review 2026-11-03 action item #4: a new domain with no backlinks has a
low crawl budget, which is a big part of why on-page SEO alone hasn't moved
rankings. These submissions are the cheapest way to earn the first few
inbound links and get crawled faster.

Most require a human (login, CAPTCHA, or manual review), so this file is a
copy-paste kit rather than an automated script. Submit from the account that
owns the project.

---

## Canonical facts (reuse everywhere)

| Field | Value |
|---|---|
| Name | Always Tools |
| URL | https://always.tools |
| Tagline | Always the right tool for the job. |
| Short desc (≤120 chars) | 18 free browser-based developer tools — JSON, Base64, hash, UUID, QR, regex and more. No signup, no tracking. |
| Category | Developer Tools / Online Utilities |
| Pricing | Free |
| Tags | developer-tools, json, base64, hash, uuid, qrcode, regex, encoding |
| GitHub | https://github.com/super-rick/always-tools |
| Author | super-rick |

### Long description (≤300 chars)

> Always Tools is a collection of 18 free online utilities that run entirely
> in your browser — JSON formatter, Base64/URL encoder, MD5 & SHA hashes,
> UUID generator, QR codes, regex tester, image compressor, and Chinese-market
> tools (Pinyin, lunar calendar, ID validation, RMB uppercase). No signup, no
> server, no tracking; your data never leaves your device.

---

## Priority directories (free, high-value, allow self-submit)

Start with these three — all free, all accept static tool sites, all pass a
real (even if nofollow) link and drive referral crawls:

1. **GitHub repo topics + website field** — the single easiest win, fully in
   your control. On https://github.com/super-rick/always-tools:
   - Set the repo **Website** field to `https://always.tools`
   - Add topics: `developer-tools`, `json`, `base64`, `hash`, `uuid`,
     `qrcode`, `regex`, `online-tools`, `cloudflare-workers`
   - A starred/topic'd repo is itself crawled and links to the site.

2. **Product Hunt** — https://www.producthunt.com/posts/new
   - There is already a draft in `promotion/producthunt.md` (local, gitignored); reuse it.
   - Best submitted early-morning PT on a weekday.

3. **Hacker News (Show HN)** — https://news.ycombinator.com/submit
   - Title: `Show HN: Always Tools – 18 free browser-based dev tools, no signup`
   - URL: `https://always.tools`
   - First comment (post immediately): see template below.

### Secondary (optional, lower effort-to-value)

- **AlternativeTo** — https://alternativeto.net/manage-item/ (list as a free
  alternative to CyberChef / it-tools / DevToys)
- **Awesome lists** — open a PR to add Always Tools to a relevant
  `awesome-*` list (e.g. awesome dev tools), which is a genuine dofollow link.
- **it-tools / self-hosted tool communities** — mention in relevant Reddit
  threads (r/webdev, r/InternetIsBeautiful) — see `promotion/reddit-post.md` (local, gitignored).

---

## Templates

### Hacker News "Show HN" first comment

> I built Always Tools because I kept googling "json formatter" and landing
> on bloated, ad-heavy pages that upload your data to a server. Every tool
> here is a single static HTML file that runs 100% in your browser — nothing
> is sent anywhere. 18 tools so far: JSON/Base64/URL/HTML-entity/Unicode,
> MD5 & SHA, UUID, regex tester, QR codes, image compressor, color converter,
> plus some Chinese-market ones (Pinyin, lunar calendar, ID validation, RMB
> uppercase). No build step, no framework, hosted free on Cloudflare. Feedback
> and tool requests welcome.

### Generic directory submission (paste-and-trim)

> **Always Tools** — https://always.tools
> 18 free online developer utilities that run entirely in your browser: JSON
> formatter, Base64/URL encoder, MD5 & SHA hash, UUID generator, QR code,
> regex tester, image compressor, and more. No signup, no tracking, no server —
> your data never leaves your device. Open source (MIT).

### Tweet / X post

> Launched Always Tools 🔧 — 18 free dev tools that run 100% in your browser.
> JSON, Base64, hashes, UUID, QR, regex + more. No signup, no tracking, data
> never leaves your device. https://always.tools

---

## Suggested order & cadence

1. GitHub website field + topics — **now** (2 min, fully yours)
2. IndexNow submission — after the key file deploys (`scripts/indexnow_submit.py`)
3. GSC Request Indexing for the 4 guides — after deploy (manual)
4. Show HN + Product Hunt — pick one weekday morning; don't do both same day
5. AlternativeTo + one awesome-list PR — the week after, once there's a
   little traffic to point to

Track which links get indexed in the next GSC review (target late November).
