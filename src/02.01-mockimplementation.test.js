import { test, mock } from "node:test";
import assert from "node:assert/strict";

const mockFn = mock.fn();

function fnUnderTest(args1) {
	return mockFn(args1) ? "Truth" : "Falsehood";
}

test("It should return correct output on true response from mockFn", () => {
	mockFn.mock.mockImplementation(() => true);
	assert.equal(fnUnderTest("will-it-work"), "Truth");
});
test("It should return correct output on false response from mockFn", () => {
	mockFn.mock.mockImplementation(() => false);
	assert.equal(fnUnderTest("will-it-work"), "Falsehood");
});
