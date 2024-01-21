import { test } from "node:test";
import assert from "node:assert/strict";

test("Simple mock assertions", (t) => {
	const mockFn = t.mock.fn();

	mockFn("call-arg-1", "call-arg-2");
	assert.deepEqual(mockFn.mock.calls[0].arguments, [
		"call-arg-1",
		"call-arg-2",
	]);
	assert.equal(mockFn.mock.callCount(), 1);

	mockFn("call-arg-3", "call-arg-4");
	assert.equal(mockFn.mock.callCount(), 2);
});
