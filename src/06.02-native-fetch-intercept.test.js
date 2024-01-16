import { test } from "node:test";
import assert from "node:assert/strict";
import { MockAgent, setGlobalDispatcher } from "undici";

test("native fetch fetch, self-contained", async () => {
	const mockAgent = new MockAgent();
	setGlobalDispatcher(mockAgent);
	mockAgent.disableNetConnect();

	mockAgent
		.get("https://api.github.com")
		.intercept({ path: "/users/HugoDF" })
		.reply(200, {
			blog: "https://codewithhugo.com",
			location: "London",
			bio: "Developer, JavaScript",
			public_repos: 39,
		});

	const data = await fetch("https://api.github.com/users/HugoDF").then((res) =>
		res.json(),
	);

	assert.deepEqual(data, {
		blog: "https://codewithhugo.com",
		location: "London",
		bio: "Developer, JavaScript",
		public_repos: 39,
	});

	mockAgent.assertNoPendingInterceptors();

	assert.deepEqual(mockAgent.pendingInterceptors(), []);
});
