// Unit tests for canonicalTarget — run with: node --test test/worker.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalTarget } from "../src/worker.js";

const HTTP = '{"scheme":"http"}';
const HTTPS = '{"scheme":"https"}';

test("www apex over https → strip www", () => {
  assert.equal(
    canonicalTarget("https://www.always.tools/md5", HTTPS),
    "https://always.tools/md5"
  );
});

test("apex over http → upgrade to https", () => {
  assert.equal(
    canonicalTarget("http://always.tools/md5", HTTP),
    "https://always.tools/md5"
  );
});

test("www over http → both fixes at once", () => {
  assert.equal(
    canonicalTarget("http://www.always.tools/uuid", HTTP),
    "https://always.tools/uuid"
  );
});

test("apex over https → pass through (null)", () => {
  assert.equal(canonicalTarget("https://always.tools/md5", HTTPS), null);
});

test("query string and path are preserved", () => {
  assert.equal(
    canonicalTarget("https://www.always.tools/search?q=a%20b&x=1", HTTPS),
    "https://always.tools/search?q=a%20b&x=1"
  );
});

test("cf-visitor http wins even when url.protocol says https (edge TLS termination)", () => {
  // At the CF edge the inbound url is often https even if the visitor used http
  assert.equal(
    canonicalTarget("https://always.tools/sha", HTTP),
    "https://always.tools/sha"
  );
});

test("trailing-slash root is preserved", () => {
  assert.equal(
    canonicalTarget("https://www.always.tools/", HTTPS),
    "https://always.tools/"
  );
});

test("non-production host (workers.dev preview) passes through", () => {
  assert.equal(
    canonicalTarget("https://always-tools.pages.dev/md5", HTTPS),
    null
  );
  assert.equal(
    canonicalTarget("https://always-tools.someacct.workers.dev/md5", HTTP),
    null
  );
});

test("localhost passes through (local dev never redirected)", () => {
  assert.equal(canonicalTarget("http://localhost:8787/md5", HTTP), null);
  assert.equal(canonicalTarget("http://127.0.0.1:8787/md5", HTTP), null);
});

test("malformed cf-visitor falls back to url.protocol", () => {
  // https url, garbage header → treated as https → pass through
  assert.equal(canonicalTarget("https://always.tools/x", "not-json"), null);
  // www https url, garbage header → still needs host fix
  assert.equal(
    canonicalTarget("https://www.always.tools/x", "not-json"),
    "https://always.tools/x"
  );
});

test("missing cf-visitor header (null) uses url.protocol", () => {
  assert.equal(canonicalTarget("https://always.tools/x", null), null);
  assert.equal(
    canonicalTarget("http://always.tools/x", null),
    "https://always.tools/x"
  );
});

test("port is dropped from canonical target", () => {
  assert.equal(
    canonicalTarget("http://www.always.tools:8080/md5", HTTP),
    "https://always.tools/md5"
  );
});
