import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("my suite", () => {
	test("one of my tests", () => {
		assert.equal(1 + 1, 2);
	});
});

describe.skip("my other suite", () => {
	test("my only true test", () => {
		assert.equal(1 + 1, 1);
	});
});
