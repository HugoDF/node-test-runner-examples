import { test, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";

let count = 0;
const counter = {
	increment() {
		count += 1;
	},
	getCount() {
		return count;
	},
};
const app = (counter) => {
	counter.increment();
};

test("app() with mock counter .toHaveBeenCalledTimes(1)", () => {
	const mockCounter = {
		increment: mock.fn(),
	};
	app(mockCounter);
	assert.equal(mockCounter.increment.mock.callCount(), 1);
});
test("app() with jest.spyOn(counter) .toHaveBeenCalledTimes(1)", () => {
	const incrementSpy = mock.method(counter, "increment");
	app(counter);
	assert.equal(incrementSpy.mock.callCount(), 1);
});
