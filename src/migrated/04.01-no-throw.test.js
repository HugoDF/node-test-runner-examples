import { test } from "node:test";
import assert from "node:assert/strict";

function throws() {
	return "success";
}

test("should not throw", () => {
	assert.doesNotThrow(throws.bind(null));
});
