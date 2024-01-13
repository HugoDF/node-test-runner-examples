import { test } from "node:test";
import assert from "node:assert/strict";
function throws() {
	throw new Error("throwing");
}

test("should throw if passed true", () => {
	assert.throws(throws.bind(null));
});
