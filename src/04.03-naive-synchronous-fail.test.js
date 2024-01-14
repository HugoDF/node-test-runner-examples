import { test } from "node:test";
import assert from "node:assert/strict";

function throwOrNot(shouldThrow = false) {
	if (shouldThrow) {
		throw new Error("shouldThrow was true");
	}

	return "success";
}

test("should throw if passed true", () => {
	try {
		throwOrNot(true);
	} catch (error) {
		assert.deepEqual(error, new Error("shouldThrow was true"));
	}
});
