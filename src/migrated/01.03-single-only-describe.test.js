import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe.only("my suite", () => {
  test.only("one of my .only test", () => {
    assert.equal(1 + 1, 2);
  });
});
describe("my other suite", () => {
  // Should fail, but isn't even run
  test("my only true test", () => {
    assert.equal(1 + 1, 1);
  });
});
