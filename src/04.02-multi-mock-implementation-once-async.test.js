import { test, mock } from "node:test";
import assert from "node:assert/strict";

const fetch = mock.fn();

async function data() {
	const data = await fetch("/endpoint-1");
	await fetch(`/endpoint-2/${data.id}`, {
		method: "POST",
	});
}

test("It should call endpoint-1 followed by POST to endpoint-2 with id", async () => {
	fetch.mock.mockImplementationOnce(async () => ({ id: "my-id" }), 0);
	fetch.mock.mockImplementationOnce(async () => {}, 1);
	await data();
	assert.equal(fetch.mock.callCount(), 2);
	assert.deepEqual(fetch.mock.calls[0].arguments, ["/endpoint-1"]);
	assert.deepEqual(fetch.mock.calls[1].arguments, [
		"/endpoint-2/my-id",
		{
			method: "POST",
		},
	]);
});
