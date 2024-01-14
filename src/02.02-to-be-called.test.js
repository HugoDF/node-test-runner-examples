import { test, mock } from "node:test";
import assert from "node:assert/strict";
const myObject = {
	doSomething() {
		console.log("does something");
	},
};

test("stub .callCount()", () => {
	const stub = mock.fn();
	stub();
	assert.equal(stub.mock.callCount(), 1, "stub called once");
});
test("spyOn .callCount()", () => {
	const somethingSpy = mock.method(myObject, "doSomething");
	myObject.doSomething();
	assert.equal(somethingSpy.mock.callCount(), 1, "somethingSpy called once");
});
