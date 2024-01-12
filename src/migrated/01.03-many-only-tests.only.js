import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("my suite", () => {
	test.only("one of my .only test", () => {
		assert.equal(1 + 1, 2);
	});
	test.only("other of my .only test", () => {
		assert.equal(1 + 2, 3);
	});
	// Should fail, but isn't even run
	test("my only true test", () => {
		assert.equal(1 + 1, 1);
	});
});
