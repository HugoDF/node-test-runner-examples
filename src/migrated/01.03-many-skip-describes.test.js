import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("my suite", () => {
	test("one of my test", () => {
		assert.equal(1 + 1, 2);
	});
});
describe.skip("other suite", () => {
	// Should fail, but isn't even run
	test("other of my .skip test", () => {
		assert.equal(1 + 2, 4);
	});
});
describe.skip("skipped other suite", () => {
	// Should fail, but isn't even run
	test("my only true test", () => {
		assert.equal(1 + 1, 1);
	});
});
