import { test, mock } from "node:test";
import assert from "node:assert/strict";
import esmock from "esmock";

const mockDb = {
	get: mock.fn(),
	set: mock.fn(),
};

test("ESM Default Export > addTodo > inserts with new id", async () => {
	const { default: lib } = await esmock("./03.01-lib.esm", {
		"./03.01-db.js": {
			...mockDb,
			default: mockDb,
		},
	});
	await lib.addTodo({ name: "new todo" });
	assert.deepEqual(mockDb.set.mock.calls[0].arguments, [
		"todos:1",
		{
			name: "new todo",
			id: 1,
		},
	]);
});

test("ESM Default Export > getTodo > returns output of db.get", async () => {
	mockDb.get.mock.mockImplementationOnce(() => ({
		id: 1,
		name: "todo-1",
	}));

	const expected = {
		id: 1,
		name: "todo-1",
	};

	const { default: lib } = await esmock("./03.01-lib.esm", {
		"./03.01-db.js": {
			...mockDb,
			default: mockDb,
		},
	});
	const actual = await lib.getTodo(1);

	assert.deepEqual(mockDb.get.mock.calls[0].arguments, ["todos:1"]);
	assert.deepEqual(actual, expected);
});
