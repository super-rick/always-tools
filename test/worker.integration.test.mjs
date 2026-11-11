// Integration test: drive the Worker's fetch handler directly, asserting on
// the returned Response object. This bypasses the `wrangler dev --local`
// egress layer, which cosmetically rewrites a same-host 301 Location's scheme
// to match the inbound request (a dev-only artifact that does not occur on the
// Cloudflare edge). Run with: node --test test/worker.integration.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";

// Minimal Request stub good enough for the handler (it only reads .url and
// .headers.get). On the real edge, request.url always arrives https-schemed and
// the original client scheme is in cf-visitor.
function makeReq(url, { cfVisitor } = {}) {
  return {
    url,
    headers: {
      get(name) {
        if (name.toLowerCase() === "cf-visitor") return cfVisitor ?? null;
        return null;
      },
    },
  };
}

// env.ASSETS stub: returns a sentinel 200 so we can tell passthrough from redirect.
const env = {
  ASSETS: {
    fetch: async () => new Response("ASSET", { status: 200 }),
  },
};

test("prod shape: apex, cf-visitor http → 301 https apex (the scheme-upgrade case)", async () => {
  // On the edge, inbound url is https even though client used http.
  const res = await worker.fetch(makeReq("https://always.tools/md5", { cfVisitor: '{"scheme":"http"}' }), env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://always.tools/md5");
});

test("prod shape: www, cf-visitor https → 301 strip www", async () => {
  const res = await worker.fetch(makeReq("https://www.always.tools/md5", { cfVisitor: '{"scheme":"https"}' }), env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://always.tools/md5");
});

test("prod shape: www, cf-visitor http → 301 both fixes, query preserved", async () => {
  const res = await worker.fetch(makeReq("https://www.always.tools/uuid?a=1&b=2", { cfVisitor: '{"scheme":"http"}' }), env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://always.tools/uuid?a=1&b=2");
});

test("no loop: apex, cf-visitor https → passthrough to ASSETS (200)", async () => {
  const res = await worker.fetch(makeReq("https://always.tools/md5", { cfVisitor: '{"scheme":"https"}' }), env);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "ASSET");
});

test("no loop: apex, no cf-visitor (url already https) → passthrough", async () => {
  const res = await worker.fetch(makeReq("https://always.tools/", {}), env);
  assert.equal(res.status, 200);
});

test("preview host passes through untouched", async () => {
  const res = await worker.fetch(makeReq("https://always-tools.pages.dev/md5", { cfVisitor: '{"scheme":"https"}' }), env);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "ASSET");
});
