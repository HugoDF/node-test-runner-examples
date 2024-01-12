import { test, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";

const mockFn = mock.fn();

function fnUnderTest(args1) {
	mockFn(args1);
}

beforeEach(() => {
	mockFn.mock.resetCalls();
});

test("Testing once", () => {
	fnUnderTest("first-call");
	assert.deepEqual(mockFn.mock.calls[0].arguments, ["first-call"]);
	assert.equal(mockFn.mock.callCount(), 1);
});
test("Testing twice", () => {
	fnUnderTest("second-call");
	assert.deepEqual(mockFn.mock.calls[0].arguments, ["second-call"]);
	assert.equal(mockFn.mock.callCount(), 1);
});
