import { test } from "node:test";
import assert from "node:assert/strict";

const user = {
	id: 1,
	friends: [],
	name: "Hugo",
	url: "https://codewithhugo.com",
};
test("should have right id and name", () => {
	assert.equal(user.id, 1);
	assert.equal(user.name, "Hugo");
});
