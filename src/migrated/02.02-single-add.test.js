import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

let state = 0;
const counter = {
	add(value) {
		state += value;
	},
	getCount() {
		return state;
	},
};

const singleAdd = (counter) => {
	counter.add(10);
};

test("singleAdd > mock.fn() calls[].arguments single call", () => {
	const mockCounter = {
		add: mock.fn(),
	};
	singleAdd(mockCounter);
	assert.deepEqual(mockCounter.add.mock.calls[0].arguments, [10]);
});

test("singleAdd > mock.method() calls[].arguments single call", () => {
	const addSpy = mock.method(counter, "add");
	singleAdd(counter);
  assert.deepEqual(addSpy.mock.calls[0].arguments, [10])
});
