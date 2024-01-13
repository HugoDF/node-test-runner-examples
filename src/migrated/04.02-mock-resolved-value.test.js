import { test, mock } from "node:test";
import assert from "node:assert/strict";

const fetch = mock.fn();

async function data() {
	const data = await fetch("/endpoint-1");
	await fetch(`/endpoint-2/${data.id}`, {
		method: "POST",
	});
}

test("Only mockImplementation(() => Promise.resolve(...)) works in reverse order", async () => {
	fetch.mock.mockImplementation(() => Promise.resolve({ data: {} })); // default other calls
	fetch.mock.mockImplementationOnce(() => Promise.resolve({ id: "my-id" }), 0); // first call
	fetch.mock.mockImplementationOnce(() => Promise.resolve({}), 1); // second call

	await data();

	assert.equal(fetch.mock.callCount(), 2);
	assert.deepEqual(fetch.mock.calls[0].arguments, ["/endpoint-1"]);
	assert.deepEqual(fetch.mock.calls[1].arguments, [
		"/endpoint-2/my-id",
		{
			method: "POST",
		},
	]);

	assert.deepEqual(await fetch(), {
		data: {},
	});
});
