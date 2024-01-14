import { test, mock } from "node:test";
import assert from "node:assert/strict";

let state = 0;
const counter = {
	add(value) {
		state += value;
	},
	getCount() {
		return state;
	},
};

const multipleAdd = (counter) => {
	counter.add(15);
	counter.add(20);
};

test("multipleAdd > mock.fn() call arguments multiple calls", () => {
	const mockCounter = {
		add: mock.fn(),
	};
	multipleAdd(mockCounter);
	assert.deepEqual(mockCounter.add.mock.calls[0].arguments, [15]);
	assert.deepEqual(mockCounter.add.mock.calls[1].arguments, [20]);
});
test("multipleAdd > mock.method() call arguments multiple calls", () => {
	const addSpy = mock.method(counter, "add");
	multipleAdd(counter);
	assert.deepEqual(addSpy.mock.calls[0].arguments, [15]);
	assert.deepEqual(addSpy.mock.calls[1].arguments, [20]);
});
