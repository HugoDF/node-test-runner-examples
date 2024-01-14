import { test } from "node:test";
import assert from "node:assert/strict";

const users = [
	{ id: 1, name: "Hugo" },
	{ id: 2, name: "Francesco" },
];

test("we should have ids 1 and 2", () => {
	assert.deepEqual(
		users.map((u) => u.id),
		[1, 2],
	);
});
