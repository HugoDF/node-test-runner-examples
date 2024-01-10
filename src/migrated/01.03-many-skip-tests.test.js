import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("my suite", () => {
  test("one of my tests", () => {
    assert.equal(1 + 1, 2);
  });
  test.skip("skipped failing test", () => {
    assert.equal(1 + 2, 3);
  });
  test.skip("my only true test", () => {
    assert.equal(1 + 1, 1);
  });
  test("{ skip: true } test", {skip: true}, () => {
    assert.equal(1 + 1, 1);
  });
  test("t.skip only true test", (t) => {
    t.skip('skipping inside the test')
    assert.equal(1 + 1, 1);
  });
});
