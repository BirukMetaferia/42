import { test } from "node:test";
import assert from "node:assert/strict";
import { getSafeRedirect } from "./redirect.js";

test("allows a local checkout path", () => {
  assert.equal(getSafeRedirect("/checkout"), "/checkout");
});

test("preserves local query parameters", () => {
  assert.equal(getSafeRedirect("/orders?page=2"), "/orders?page=2");
});

test("rejects an external URL", () => {
  assert.equal(getSafeRedirect("https://evil.com"), "/");
});

test("rejects a protocol-relative URL", () => {
  assert.equal(getSafeRedirect("//evil.com"), "/");
});

test("rejects a backslash-based redirect", () => {
  assert.equal(getSafeRedirect("/\\evil.com"), "/");
});

test("defaults an empty destination to home", () => {
  assert.equal(getSafeRedirect(""), "/");
});
