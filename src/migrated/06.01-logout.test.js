import { test, mock } from "node:test";
import assert from "node:assert/strict";

async function logout(request, res) {
	request.session.data = null;
	return res.status(200).json();
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

test("should set session.data to null", async () => {
	const request = mockRequest({ username: "hugo" });
	const res = mockResponse();
	await logout(request, res);
	assert.equal(request.session.data, null);
});
test("should 200", async () => {
	const request = mockRequest({ username: "hugo" });
	const res = mockResponse();
	await logout(request, res);
	assert.deepEqual(res.status.mock.calls[0].arguments, [200]);
});
