import { test } from "node:test";
import assert from "node:assert/strict";
const oddArray = [1, 3, 5, 7, 9, 11, 13];

test("should start correctly", () => {
	assert(oddArray.includes(1), "oddArray to contain 1");
	assert(oddArray.includes(3), "oddArray to contain 3");
	assert(oddArray.includes(5), "oddArray to contain 5");
	assert(oddArray.includes(7), "oddArray to contain 7");
	assert(oddArray.includes(9), "oddArray to contain 9");
});
