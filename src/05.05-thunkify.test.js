import { test } from "node:test";
import assert from "node:assert/strict";

const thunkify = (fn) => () => fn();

test("thunkify should return a function", () => {
	assert.equal(typeof thunkify(() => {}), "function");
});
