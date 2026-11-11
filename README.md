# ⚡ Always Tools

> Always the right tool for the job.

18 free online tools that run entirely in your browser. No backend, no tracking, no signup.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://always.tools)

🔗 **[always.tools](https://always.tools)**

---

## Tools

### Encoding & Text
- **[JSON Formatter](https://always.tools/json-formatter)** — Format, validate, minify JSON
- **[Base64 Encoder](https://always.tools/base64)** — Encode/decode text & files
- **[URL Encoder](https://always.tools/url-encode)** — URL encode/decode
- **[HTML Entity](https://always.tools/html-entity)** — HTML entity encode/decode
- **[Unicode Converter](https://always.tools/unicode)** — Text ↔ Unicode escapes
- **[Pinyin Converter](https://always.tools/pinyin)** — 汉字 → 拼音

### Developer
- **[Regex Tester](https://always.tools/regex-test)** — Real-time regex with match highlighting
- **[Timestamp Converter](https://always.tools/timestamp)** — Unix ↔ Date, live clock
- **[MD5 Hash](https://always.tools/md5)** — MD5 checksum & hash
- **[SHA Hash](https://always.tools/sha)** — SHA-1/256/384/512
- **[UUID Generator](https://always.tools/uuid)** — UUID v4 in bulk

### Design & Media
- **[QR Code Generator](https://always.tools/qrcode)** — Generate & download PNG
- **[Image Compressor](https://always.tools/image-compress)** — Compress JPEG/PNG/WebP
- **[Color Converter](https://always.tools/color-convert)** — HEX / RGB / HSL

### Utility
- **[Word Counter](https://always.tools/word-count)** — Words, chars, Chinese chars
- **[Morse Code](https://always.tools/morse)** — Convert & play audio
- **[RMB Uppercase](https://always.tools/rmb)** — 人民币大写转换
- **[ID Card Validator](https://always.tools/id-card)** — 身份证号码校验
- **[Lunar Calendar](https://always.tools/lunar)** — 公历转农历

## Guides

- **[How to Generate a UUID](https://always.tools/how-to-generate-uuid)** — JavaScript, Java, Python
- **[UUID v4 vs UUID v7](https://always.tools/uuid-v4-vs-v7)** — Which to use, and why
- **[Verify an MD5 Checksum](https://always.tools/verify-md5-checksum)** — Windows, macOS, Linux
- **[URL Encoding Explained](https://always.tools/url-encoding-guide)** — Percent-encoding reference

---

## Tech Stack

```
Pure HTML/CSS/JS  ·  Zero frameworks
Cloudflare Workers + static assets  ·  Free hosting, global CDN
Client-side only  ·  Your data never leaves your browser
```

Each tool is a single self-contained HTML file in `public/`. No build step, no npm, no server. A thin Worker (`src/worker.js`) fronts the assets only to canonicalize the host/scheme (www→apex, http→https) for SEO.

---

## Why

Tool websites are the ultimate passive income play for solo developers:
- No servers, no database, no auth
- SEO does the marketing
- Build once, earn for years

Every tool targets 5–10 long-tail search keywords. 18 tools × ~8 keywords = ~140 entry points from search.

---

## Development

```bash
git clone git@github.com:super-rick/always-tools.git
cd always-tools
python3 -m http.server 8888 --directory public    # or any static server
open http://localhost:8888
```

Run the checks:

```bash
npm run lint    # html-validate public/*.html
npm test        # node --test — Worker redirect logic
```

Add a new tool:
1. Copy an existing file in `public/`
2. Edit the `<title>`, `<h1>`, tool logic
3. Add to `public/index.html` tool grid
4. Add to `public/sitemap.xml`

---

## Roadmap

- [x] 18 tools (incl. Pinyin, Lunar calendar, ID card, RMB uppercase)
- [x] Google Search Console + Sitemap
- [x] AdSense setup
- [x] Dark mode
- [x] Long-form SEO guides
- [x] www→apex + http→https canonicalization
- [ ] PWA offline support

---

## License

MIT © 2026 Always Tools

---

⭐ If you find this useful, star the repo. PRs welcome!
