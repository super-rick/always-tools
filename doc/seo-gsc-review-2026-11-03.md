# Always Tools GSC 复盘与行动计划（2026-11-03）

## 背景

基于 2026-11-03 导出的 GSC Performance 数据（2026-08-01 ~ 2026-10-31，92 天），对比 2026-09-16 基线，复盘 v1.1.0（核心三页加厚）、v1.2.0（第二梯队五页加厚 + ads.txt）、v1.3.0（4 篇英文 how-to 指南）的效果，并制定下一阶段计划。

## 数据对比

### 总量 vs 9-16 基线

| 指标 | 9-16 基线（前 3 月） | 本次（8~10 月） | 判断 |
|---|---:|---:|---|
| 总曝光 | 2,303 | 3,215 | 窗口不同，需看月度 |
| 总点击 | 2 | 1 | 仍然 ≈ 0 |
| 加权平均排名 | 71.3 | 73.1 | 未改善 |
| 查询数 | 421 | 537 | 覆盖面略增 |

### 月度走势

| 月 | 曝光 | 平均排名 |
|---|---:|---:|
| 2026-08 | 1,864 | 71.6 |
| 2026-09 | 486 | 77.0 |
| 2026-10 | 865 | 74.0 |

### 周度关键点

- 8 月周均曝光 ~600（峰值 08-10 周 831）；
- 9 月塌陷：**08-24 周与 09-14 周曝光为 0**（09-14 周正是 `_redirects` 重定向死循环上线又回滚的时间窗）；
- 10 月缓慢恢复至 ~190/周；
- 最近一周（10-26 起）平均排名 64.7，为 8 月以来最好值——处于恢复通道，内容加厚的排名红利尚未兑现。

## 发现的结构性问题（按危害排序）

### 1. URL 分裂仍在恶化（当前最大瓶颈）

Pages.csv 共 37 个 URL：15 个 `.html`、9 个 `www`、2 个 `http`。同一页面权重最多被切成 4 份：

| 页面 | 变体分布（曝光） |
|---|---|
| md5 | `.html` 874 + 无后缀 49 |
| uuid | 无后缀 528 + `.html` 322 |
| unicode | **`www` 259** + `http://www` 8 |
| url-encode | `.html` 371 + 无后缀 166 |

实测（2026-11-03）：`https://www.always.tools/md5` 返回 200 不跳转；Google `site:` 索引中仍存在 `www.always.tools/unicode`、`/timestamp`。**www→裸域 301 自 9-16 提出至今未配置**，这是"内容加厚了但排名没动"的主要结构性解释之一。

### 2. v1.3.0 四篇文章上线 25 天零收录

`how-to-generate-uuid` / `uuid-v4-vs-v7` / `verify-md5-checksum` / `url-encoding-guide` 既不在 Pages.csv，也不在 `site:` 索引。原因：

1. 站点整体抓取预算低（新域名、外链少）；
2. **首页没有任何指向文章的链接**（已核实 index.html 为 0 条），文章仅挂在 3 个工具页的 related 区。

### 3. 中文工具排名远好于英文工具（被忽视的亮点）

| 页面 | 排名 | 备注 |
|---|---:|---|
| id-card | 35~40 | **拿到了全站唯一的 1 次点击** |
| lunar | 36~49 | — |
| timestamp | 57.9 | www 形态收录 |
| 首页 | 18.2 | — |
| 英文工具页 | 60~88 | `uuid generator`（曝光 214）排名 82.7 |

`uuid generator` 类大词是和高权重老站硬碰，新域名无外链仅靠 on-page 推不进前 50；中文长尾工具竞争小，离首页近得多。

## 行动计划

| # | 事项 | 谁做 | 状态 | 预期 |
|---|---|---|---|---|
| 1 | **www→apex 301 + http→https**（改用 Worker 实现，非面板） | agent | ✅ 已上线（PR #9，2026-11-11）；实测 `https://www.always.tools/md5`→301 裸域、`http://`→https，`https://always.tools/md5`→200 无循环 | 止血权重分裂，2-4 周后 GSC URL 归一 |
| 2 | **首页加 Guides 区块** + GSC Request Indexing + IndexNow | agent 做页面与 IndexNow；Request Indexing 需用户 | ✅ 首页已上线（PR #7）；✅ IndexNow key+脚本已上线并提交（PR #10，guides+全站 24 URL 均 202 Accepted，2026-11-11）；◐ GSC Request Indexing 仍待用户手动 | 解决文章零收录 |
| 3 | **中文工具线加码**：id-card / lunar / rmb / pinyin | agent | ✅ 已上线（PR #8，含 lunar/rmb 三处 bug 修复） | 攻 35→前 20 |
| 4 | **外链起步**：README 挂链接 + 目录站提交 | 用户 + agent | ◐ README 已刷新为 18 工具+无后缀 URL+指南（PR #11）；✅ 提交文案 kit 已备（doc/backlink-kit.md）；☐ 实际目录站提交（Show HN / Product Hunt / GitHub topics）待用户 | 新域名硬伤，迟做不如早做 |
| 5 | v1.2 / v1.3 效果继续观察至 11 月底再评判 | — | ☐ 观察中 | 10 月已在恢复通道 |

### 仍需用户手动的两件事

1. **GSC → URL Inspection → Request Indexing**，对 4 个指南 URL 各做一次（IndexNow 不覆盖 Google）。
2. **目录站提交**：按 `doc/backlink-kit.md` 走——最快的是 GitHub repo 的 Website 字段 + topics（2 分钟、完全可控）。

执行顺序约束：**#1 是前置项**——www 分裂不修，#3 / #5 的效果都会被稀释。#2、#3 可由 agent 直接动手（feature 分支 → PR 流程）。

## 下次 GSC 对比基线（2026-11-03 导出）

- 总量：曝光 3,215 / 点击 1 / 加权平均排名 73.1 / 查询 537 / 页面 37
- 月度：8 月 1,864@71.6 / 9 月 486@77.0 / 10 月 865@74.0
- Top pages：md5.html 874@70.5 / uuid 528@75.0 / url-encode.html 371@73.3 / uuid.html 322@71.7 / www:unicode 259@71.2 / morse.html 200@78.6
- Top queries：uuid generator 214@82.7 / md5 hash 51@85.3 / md5 online 45@67.3 / urlencode 44@79.9 / url encode 43@80.8
- 国家：US 613 / IN 217 / VN 215 / ID 133 / PH 131
- 设备：Desktop 3,005 / Mobile 207 / Tablet 3
