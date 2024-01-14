import { test, mock } from "node:test";
import assert from "node:assert/strict";

test("toHaveBeenCalledWith(arrayContaining)", () => {
	const myFunction = mock.fn();
	myFunction([1, 2, 3]);
	assert(
		myFunction.mock.calls[0].arguments[0].includes(2),
		"myFunction called with array containing 2",
	);
});

test("toHaveBeenCalledWith(objectContaining)", () => {
	const myFunction = mock.fn();
	myFunction({
		name: "Hugo",
		website: "codewithhugo.com",
	});
	assert.equal(myFunction.mock.calls[0].arguments[0].name, "Hugo");
});

test.todo("toHaveBeenCalledWith(nested object/array containing)", () => {
	const myFunction = mock.fn();
	myFunction([
		{ age: 21, counsinIds: [1] },
		{ age: 22, counsinIds: [1, 3] },
		{ age: 23 },
	]);
	// expect(myFunction).toHaveBeenCalledWith(
	// 	expect.arrayContaining([
	// 		expect.objectContaining({
	// 			age: 22,
	// 			counsinIds: expect.arrayContaining([3]),
	// 		}),
	// 	]),
	// );
});
