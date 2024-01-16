import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { Agent, MockAgent, setGlobalDispatcher } from "undici";

const mockAgent = new MockAgent();
before(() => {
	setGlobalDispatcher(mockAgent);
	mockAgent.disableNetConnect();
});
after(async () => {
	await mockAgent.close();
	setGlobalDispatcher(new Agent());
});
test("native fetch interception via undici", async () => {
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
