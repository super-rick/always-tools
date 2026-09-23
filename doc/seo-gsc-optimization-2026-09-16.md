# Always Tools SEO 优化说明（2026-09-16）

## 背景

本次优化基于 Google Search Console 导出的 Performance on Search 数据，重点分析最近 3 个月的自然搜索表现。

核心数据摘要：

| 指标 | 结果 |
|---|---:|
| 总曝光 | 约 2303 |
| 总点击 | 2 |
| 加权平均排名 | 约 71.34 |
| 查询数 | 421 |
| 页面数 | 29 |
| 主要流量设备 | Desktop |

主要问题不是 CTR（Click Through Rate，点击率）本身，而是：

1. 核心工具页平均排名过低，大多在 60-80 名；
2. 工具页内容偏薄，缺少说明、示例、FAQ、长尾词覆盖；
3. GSC 中出现 `www` / non-www、http / https、`.html` / 无后缀 URL 混合，存在规范化风险；
4. 结构化数据较弱，无法充分帮助搜索引擎理解页面类型和 FAQ 内容。

---

## 优先处理页面

本次优先处理 GSC 曝光最高的三个页面：

| 页面 | GSC 曝光 | 原平均排名 | 优先级 |
|---|---:|---:|---|
| `md5.html` | 899 | 70.14 | P0 |
| `url-encode.html` | 372 | 72.49 | P0 |
| `uuid.html` | 322 | 71.73 | P0 |

这些页面已经有搜索曝光，但排名很靠后。优先目标是先把页面从 70 名左右提升到 30-50 名区间，再观察是否能进一步进入前 20 / 前 10。

---

## 已修改文件

```text
public/md5.html
public/url-encode.html
public/uuid.html
public/_redirects
wrangler.jsonc
package.json
doc/seo-gsc-optimization-2026-09-16.md
```

> 结构调整：2026-09-16 晚将全部网站文件迁入 `public/`，`wrangler.jsonc` 的 `assets.directory` 改为 `./public`。这样 `doc/`、`.git/`、`node_modules/` 不再进入发布包，内部文档不会暴露到线上。
>
> 补充修正：Workers 静态资产内置 HTML handling 会把 `.html` 重定向到无后缀 URL（307），与原 `_redirects`（无后缀 → `.html` 301）方向相反，造成重定向死循环导致子页面打不开。已删除 `public/_redirects`，canonical、sitemap、内链统一改为无后缀 URL。

---

## 1. MD5 页面优化

文件：

```text
md5.html
```

### 修改点

#### Title

从：

```html
<title>MD5 Hash Generator — Online MD5 Hash Calculator | Always Tools</title>
```

改为：

```html
<title>MD5 Hash Generator Online - Free Browser-Based MD5 Tool | Always Tools</title>
```

#### Meta description

从：

```html
<meta name="description" content="Free online MD5 hash generator. Generate MD5 hashes from any text. All processing in your browser — your data never leaves your device.">
```

改为：

```html
<meta name="description" content="Generate MD5 hashes online in your browser. Fast, free, and private MD5 checksum tool with examples and no upload required.">
```

#### H1

从：

```html
<h1>MD5 Hash Generator</h1>
```

改为：

```html
<h1>MD5 Hash Generator Online</h1>
```

### 新增 SEO 内容区

新增内容覆盖：

- free online MD5 hash generator
- MD5 checksum
- browser-based MD5 tool
- local processing
- MD5 use cases
- MD5 security note
- FAQ

新增示例：

```text
Input: hello
MD5: 5d41402abc4b2a76b9719d911017c592
```

### 目标搜索词

| 关键词 | 意图 |
|---|---|
| md5 hash generator | 生成 MD5 |
| md5 online | 在线 MD5 工具 |
| md5 checksum | 校验和 |
| generate md5 hash | 生成 hash |
| browser-based md5 tool | 浏览器本地工具 |

---

## 2. URL Encode 页面优化

文件：

```text
url-encode.html
```

### 修改点

#### Title

从：

```html
<title>URL Encoder — Online URL Decode & Encode | Always Tools</title>
```

改为：

```html
<title>URL Encoder and Decoder Online - Encode URLs Safely | Always Tools</title>
```

#### Meta description

从：

```html
<meta name="description" content="Free online URL encoder and decoder. Encode special characters for URLs or decode percent-encoded strings.">
```

改为：

```html
<meta name="description" content="Encode and decode URLs online. Convert special characters to percent-encoding and decode URL-encoded text instantly in your browser.">
```

#### H1

从：

```html
<h1>URL Encoder / Decoder</h1>
```

改为：

```html
<h1>URL Encoder and Decoder Online</h1>
```

### 新增 SEO 内容区

新增内容覆盖：

- URL encoder and decoder
- percent-encoding
- query parameters
- callback URLs
- API testing
- `encodeURIComponent`
- `%20`
- encodeURI vs encodeURIComponent
- FAQ

新增示例：

```text
Input: hello world?x=1&y=2
Encoded: hello%20world%3Fx%3D1%26y%3D2
```

### 目标搜索词

| 关键词 | 意图 |
|---|---|
| url encode online | 在线 URL 编码 |
| url encoder online | URL 编码工具 |
| urlencode online | urlencode 工具 |
| url decoder online | URL 解码工具 |
| encodeURIComponent online | JS 编码函数验证 |

---

## 3. UUID 页面优化

文件：

```text
uuid.html
```

### 修改点

#### Title

从：

```html
<title>UUID Generator — Generate UUID v4 Online | Always Tools</title>
```

改为：

```html
<title>UUID Generator Online - Generate v4 UUIDs Instantly | Always Tools</title>
```

#### Meta description

从：

```html
<meta name="description" content="Free online UUID v4 generator. Generate random UUIDs in bulk. No signup required, runs in your browser.">
```

改为：

```html
<meta name="description" content="Generate random UUID v4 values online. Fast, free, and private browser-based UUID generator with copy support.">
```

#### H1

从：

```html
<h1>UUID Generator</h1>
```

改为：

```html
<h1>UUID Generator Online</h1>
```

### 新增 SEO 内容区

新增内容覆盖：

- UUID v4 generator
- GUID
- database IDs
- distributed systems
- request tracing
- test data
- Web Crypto API
- collision explanation
- FAQ

新增示例：

```text
Example UUID v4:
3f8c6f68-4f85-4c4d-9b46-7f8f7b7c9a21
```

### 目标搜索词

| 关键词 | 意图 |
|---|---|
| uuid generator | 生成 UUID |
| uuid generator online | 在线 UUID 工具 |
| uuid v4 generator | v4 UUID |
| generate uuid online | 在线生成 UUID |
| guid generator | GUID 长尾 |

---

## 4. 结构化数据优化

三个核心页面均增强了 JSON-LD 结构化数据。

### 原状态

原来基本是简单的 `SoftwareApplication`：

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "...",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web"
}
```

### 现状态

现在使用：

```text
WebApplication + FAQPage
```

包含：

- `name`
- `url`
- `applicationCategory`
- `operatingSystem`
- `description`
- `offers.price = 0`
- `offers.priceCurrency = USD`
- 页面可见 FAQ 对应的 `FAQPage`

### 目的

帮助搜索引擎更明确地理解：

1. 这是一个 Web 工具；
2. 它是免费工具；
3. 工具运行在浏览器中；
4. 页面包含 FAQ，可覆盖更多长尾搜索意图。

---

## 5. URL 规范化处理

新增文件：

```text
_redirects
```

这是 Cloudflare Pages 支持的重定向配置文件。

### 处理 host / protocol 规范化

```text
http://always.tools/* https://always.tools/:splat 301
http://www.always.tools/* https://always.tools/:splat 301
https://www.always.tools/* https://always.tools/:splat 301
```

作用：

| 来源 URL | 目标 URL |
|---|---|
| `http://always.tools/...` | `https://always.tools/...` |
| `http://www.always.tools/...` | `https://always.tools/...` |
| `https://www.always.tools/...` | `https://always.tools/...` |

### 处理无后缀 URL

当前站点 canonical、sitemap、内链都使用 `.html`，所以本次保守选择：

```text
/md5 -> /md5.html
/url-encode -> /url-encode.html
/uuid -> /uuid.html
```

同时对所有现有 HTML 页面都增加了对应无后缀到 `.html` 的 301。

### 为什么这次没有直接改成无后缀 canonical？

因为当前项目中：

- canonical 是 `.html`
- sitemap 是 `.html`
- 内链是 `.html`
- README 是 `.html`
- Google 已经主要索引 `.html`

如果一次性全站切到 extensionless URL，需要同步改：

1. 所有页面 canonical；
2. sitemap；
3. 首页工具链接；
4. nav 链接；
5. related links；
6. README；
7. `_redirects` 反向规则；
8. GSC 重新提交 sitemap。

这属于第二阶段 URL 迁移，不建议和本次内容加厚混在一起。

---

## 6. package.json lint 修复

文件：

```text
package.json
```

### 原配置

```json
"lint": "html-validate '*.html'"
```

在当前 Windows git-bash/npm 环境下会把引号带入参数，导致：

```text
No files matching patterns [ "'*.html'" ]
```

### 新配置

```json
"lint": "html-validate *.html"
```

修复后 `npm run lint` 可以正确扫描 HTML 文件。

---

## 验证记录

### 1. HTML lint

执行：

```bash
npm run lint
```

结果：

```text
> lint
> html-validate *.html
```

退出码 0，通过。

### 2. 本地静态服务验证

执行：

```bash
python -m http.server 8787
```

验证结果：

```text
/md5.html          200 contains MD5 Hash Generator Online
/url-encode.html   200 contains URL Encoder and Decoder Online
/uuid.html         200 contains UUID Generator Online
/_redirects        200 contains Canonical host
```

### 3. JSON-LD 验证

三个页面 JSON-LD 均可被 Python 正常解析：

```text
md5.html          WebApplication, FAQPage
url-encode.html   WebApplication, FAQPage
uuid.html         WebApplication, FAQPage
```

---

## 7. 第二梯队页面优化（2026-09-24）

延续第一轮核心页面优化，对 GSC 曝光次高的五个页面做同样的内容加厚：

| 页面 | 原 GSC 曝光 | 原平均排名 | 新 H1 |
|---|---:|---:|---|
| `unicode.html` | 259 | 71.23 | Unicode Converter Online |
| `morse.html` | 214 | 78.17 | Morse Code Converter Online |
| `html-entity.html` | 57 | 68.56 | HTML Entity Encoder and Decoder Online |
| `sha.html` | 42 | 67.12 | SHA Hash Generator Online |
| `qrcode.html` | 45 | 87.89 | QR Code Generator Online |

### 每页统一改动

与 md5 / url-encode / uuid 相同套路：

1. Title / Meta / H1 优化，加入 `Online` 与长尾关键词；
2. 新增 `.seo-content` 区块：说明段落 + 示例框 + 使用场景 + FAQ；
3. JSON-LD 从 `SoftwareApplication` 升级为 `WebApplication`（含 `offers.price = 0`）+ `FAQPage`（与页面可见 FAQ 一致）。

### 各页示例

```text
unicode      Input: Hello  ->  Unicode: \u0048\u0065\u006c\u006c\u006f
morse        Input: SOS    ->  Morse: ... --- ...
html-entity  Input: <div>Hello</div>  ->  &lt;div&gt;Hello&lt;/div&gt;
sha          Input: hello  ->  SHA-256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
qrcode       Input: https://always.tools  ->  QR code PNG image
```

> 示例值均与实际工具输出一致（SHA-256 与 Unicode 转义已核对）。

### 隐私声明差异

- `unicode` / `morse` / `html-entity` / `sha` 为纯浏览器本地 JS，隐私声明（“数据不离开设备”）属实。
- `qrcode` 实际调用 `api.qrserver.com` 生成二维码，内容会外发，因此未写入“本地处理”声明。

---

## 后续建议

### 第一优先级：加厚第二梯队页面（✅ 已完成 2026-09-24）

以下五个页面已完成加厚（见第 7 节）：

| 页面 | 原 GSC 曝光 | 原平均排名 |
|---|---:|---:|
| `unicode.html` | 259 | 71.23 |
| `morse.html` | 214 | 78.17 |
| `html-entity.html` | 57 | 68.56 |
| `sha.html` | 42 | 67.12 |
| `qrcode.html` | 45 | 87.89 |

### 第二优先级：抽公共模板

当前每个 HTML 文件重复大量：

- header
- nav
- footer
- related links
- CSS variables
- dark mode script

短期可以接受；长期建议引入简单生成脚本或模板系统，否则 20+ 工具页维护成本会越来越高。

### 第三优先级：URL 战略（已解决）与遗留跳转

URL 战略已确定：全站采用无后缀 URL（canonical、sitemap、内链统一为 `/md5` 等），`.html` 由 Workers 内置 307 重定向到无后缀。此事项已在 `3921428` 完成。

遗留待办（无法在仓库内完成，需 Cloudflare 仪表盘配置）：

- `http://` → `https://`：SSL/TLS → Edge Certificates → Always Use HTTPS 打开；
- `www.` → 非 `www.`：Rules → Redirect Rules 建立 301 跳转。

这两项未配置时，`http://` 与 `www.` 变体仍会 200 返回，造成 GSC 中重复 URL 分流。

### 第四优先级：上线后观察 GSC

上线后建议观察：

| 时间 | 观察项 |
|---|---|
| 7 天 | 页面是否重新抓取，canonical 是否稳定 |
| 14 天 | impressions 是否增加 |
| 28 天 | 平均排名是否从 70 向 40-50 移动 |
| 60 天 | 是否出现 10-30 名 query |

---

## 当前分支

```text
main
```

第一轮（md5 / url-encode / uuid）与第二轮（第二梯队五页）均已提交并推送到 main。
