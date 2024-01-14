import { test } from "node:test";
import assert from "node:assert/strict";

async function asyncThrowOrNot() {
	throw new Error("async-throw");
}

test("should reject/throw await assert.rejects", async () => {
	await assert.rejects(asyncThrowOrNot);
});

test("should reject/throw return assert.rejects", () => {
	return assert.rejects(asyncThrowOrNot);
});

test("assert on error", async () => {
	await assert.rejects(asyncThrowOrNot, new Error("async-throw"));

	await assert.rejects(asyncThrowOrNot, (err) => {
		assert.deepEqual(err, new Error("async-throw"));
		return true;
	});
});
