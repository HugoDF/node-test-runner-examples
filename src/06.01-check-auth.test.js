// @ts-nocheck
import { test, mock } from "node:test";
import assert from "node:assert/strict";

async function checkAuth(request, res) {
	if (!request.session.data) {
		return res.status(401).json();
	}

	const { username } = request.session.data;
	return res.status(200).json({ username });
}

const mockRequest = (sessionData) => {
	return {
		session: { data: sessionData },
	};
};

const mockResponse = () => {
	const res = {};
	res.status = mock.fn();
	res.status.mock.mockImplementation(() => res);
	res.json = mock.fn();
	res.status.mock.mockImplementation(() => res);
	return res;
};

test("should 401 if session data is not set", async () => {
	const request = mockRequest();
	const res = mockResponse();
	await checkAuth(request, res);
	assert.deepEqual(res.status.mock.calls[0].arguments, [401]);
});
test("should 200 with username from session if session data is set", async () => {
	const request = mockRequest({ username: "hugo" });
	const res = mockResponse();
	await checkAuth(request, res);
	assert.deepEqual(res.status.mock.calls[0].arguments, [200]);
	assert.deepEqual(res.json.mock.calls[0].arguments, [{ username: "hugo" }]);
});
