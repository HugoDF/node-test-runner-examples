import { test, mock } from "node:test";
import assert from "node:assert/strict";

const appWork = (createUser) => {
	return async (request, response) => {
		const { name } = request.body;
		const user = await createUser(name, new Date());
		return response.status(201).json(user);
	};
};

test("should call createUser with right types", async () => {
	const request = {
		body: {
			name: "User Name",
		},
	};
	const response = {
		status: mock.fn(() => response),
		json: mock.fn(() => response),
	};
	const mockCreateUser = mock.fn();
	await appWork(mockCreateUser)(request, response);
	const args = mockCreateUser.mock.calls[0].arguments;
	assert.equal(typeof args[0], "string");
	assert(args[1] instanceof Date);
});
