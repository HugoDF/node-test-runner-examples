import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

const myObject = {
	doSomething() {
		console.log("does something");
	},
};

test("mock.method().mock.mockImplementation()", () => {
	const somethingSpy = mock.method(myObject, "doSomething");
  somethingSpy.mock.mockImplementation(() => {});
	myObject.doSomething();
	assert.equal(somethingSpy.mock.callCount(), 1);
});

test.skip("mock.method().mockReturnValue()", () => {
	const somethingSpy = jest.spyOn(myObject, "doSomething").mockReturnValue();
	myObject.doSomething();
	expect(somethingSpy).toHaveBeenCalled();
});
