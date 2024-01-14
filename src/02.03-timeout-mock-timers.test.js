import { test, mock, afterEach } from "node:test";
import assert from "node:assert/strict";

const isNode20OrLower = process.versions.node.split(".")[0] <= "20";

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

afterEach(() => {
	mock.timers.reset();
});

test("mock.timers can mock setTimeout", async (t) => {
	t.mock.timers.enable(["setTimeout"]);

	const fn = mock.fn();

	const wait1 = wait(1000).then(() => fn());
	const wait2 = wait(10000).then(() => fn());

	assert.equal(fn.mock.callCount(), 0, "fn should not have been called");

	t.mock.timers.tick(1000);
	await wait1; // await is required to flush promises

	assert.equal(fn.mock.callCount(), 1, "fn should have been called once");

	t.mock.timers.runAll();
	await wait2; // await is required to flush promises

	assert.equal(fn.mock.callCount(), 2, "fn should have been called twice");
});

test.skip("mock.timers.setTime", { skip: isNode20OrLower }, async (t) => {
	t.mock.timers.enable({ apis: ["setTimeout"] });

	const fn = mock.fn();

	const wait1 = wait(1000).then(() => fn());

	t.mock.timers.setTime(999);

	assert.equal(fn.mock.callCount(), 0, "fn should not have been called");

	t.mock.timers.setTime(1002);
	await wait1;

	assert.equal(fn.mock.callCount(), 1, "fn should have been called once");
});
