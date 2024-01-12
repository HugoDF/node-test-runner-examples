import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

const myObject = {
	doSomething() {
		console.log("does something");
	},
};

test("mock.fn() mock.callCount()/mock.calls.length", () => {
	const stub = mock.fn();
  assert.equal(stub.mock.callCount(), 0)
  assert.equal(stub.mock.calls.length, 0)
});
test("mock.method() mock.callCount()/mock.calls.length", () => {
  const somethingSpy = mock.method(myObject, "doSomething", () => {});
	assert.equal(somethingSpy.mock.callCount(), 0);
	assert.equal(somethingSpy.mock.calls.length, 0);
});
