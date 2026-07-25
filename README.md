# ⚡ Always Tools

> Always the right tool for the job.

14 free online tools that run entirely in your browser. No backend, no tracking, no signup.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://always.tools)

🔗 **[always.tools](https://always.tools)**

---

## Tools

### Encoding
- **[JSON Formatter](https://always.tools/json-formatter.html)** — Format, validate, minify JSON
- **[Base64 Encoder](https://always.tools/base64.html)** — Encode/decode text & files
- **[URL Encoder](https://always.tools/url-encode.html)** — URL encode/decode
- **[HTML Entity](https://always.tools/html-entity.html)** — HTML entity encode/decode
- **[Unicode Converter](https://always.tools/unicode.html)** — Text ↔ Unicode escapes

### Developer
- **[Regex Tester](https://always.tools/regex-test.html)** — Real-time regex with match highlighting
- **[Timestamp Converter](https://always.tools/timestamp.html)** — Unix ↔ Date, live clock
- **[Hash Generator](https://always.tools/md5.html)** — SHA-1/256/384/512
- **[UUID Generator](https://always.tools/uuid.html)** — UUID v4 in bulk

### Everyday
- **[QR Code Generator](https://always.tools/qrcode.html)** — Generate & download PNG
- **[Image Compressor](https://always.tools/image-compress.html)** — Compress JPEG/PNG/WebP
- **[Color Converter](https://always.tools/color-convert.html)** — HEX / RGB / HSL
- **[Word Counter](https://always.tools/word-count.html)** — Words, chars, Chinese chars
- **[Morse Code](https://always.tools/morse.html)** — Convert & play audio

---

## Tech Stack

```
Pure HTML/CSS/JS  ·  Zero frameworks
Cloudflare Pages  ·  Free hosting, global CDN
Client-side only  ·  Your data never leaves your browser
```

Each tool is a single self-contained HTML file. No build step, no npm, no server.

---

## Why

Tool websites are the ultimate passive income play for solo developers:
- No servers, no database, no auth
- SEO does the marketing
- Build once, earn for years

Every tool targets 5–10 long-tail search keywords. 14 tools × 10 keywords = 140 entry points from Google.

---

## Development

```bash
git clone git@github.com:super-rick/always-tools.git
cd always-tools
python3 -m http.server 8888    # or any static server
open http://localhost:8888
```

Add a new tool:
1. Copy an existing `.html` file
2. Edit the `<title>`, `<h1>`, tool logic
3. Add to `index.html` tool grid
4. Add to `sitemap.xml`

---

## Roadmap

- [x] 14 core tools
- [x] Google Search Console + Sitemap
- [x] AdSense setup
- [ ] Pinyin converter (汉字 → 拼音)
- [ ] Lunar calendar (农历转换)
- [ ] ID card validator (身份证校验)
- [ ] RMB uppercase converter (人民币大写)
- [ ] Dark mode
- [ ] PWA offline support

---

## License

MIT © 2026 Always Tools

---

⭐ If you find this useful, star the repo. PRs welcome!
