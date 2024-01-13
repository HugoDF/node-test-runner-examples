import { test } from "node:test";
import assert from "node:assert/strict";
const user = {
	id: 1,
	name: "Hugo",
	friends: [3, 5, 22],
};

test("user 3 should be a friend of user", () => {
	assert.notEqual(user.url, "https://codewithhugo.com");
	// Can't be your own friend?
	assert(!user.friends.includes(1));
});
