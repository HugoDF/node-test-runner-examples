import { test, mock } from "node:test";
import assert from "node:assert/strict";

const getNow = () => new Date(Date.now());

test("It should create correct now Date", () => {
	mock
		.method(global.Date, "now")
		.mock.mockImplementationOnce(() =>
			new Date("2023-05-14T11:01:58.135Z").valueOf(),
		);

	assert.deepEqual(getNow(), new Date("2023-05-14T11:01:58.135Z"));
});
