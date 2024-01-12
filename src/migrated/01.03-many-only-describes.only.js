/**
 * this fails when run with `node --test`
 * it needs `node --test --test-only`
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe.only("my suite", () => {
	test("one of my .only test", () => {
		assert.equal(1 + 1, 2);
	});
});
describe.only("other suite", () => {
	test("other of my .only test", () => {
		assert.equal(1 + 2, 3);
	});
});
describe("skipped other suite", () => {
	// Should fail, but isn't even run
	test("my only true test", () => {
		assert.equal(1 + 1, 1);
	});
});
