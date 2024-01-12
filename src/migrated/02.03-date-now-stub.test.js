import { test, mock } from "node:test";
import assert from "node:assert/strict";

const literallyJustDateNow = () => Date.now();

test("It should call and return Date.now()", () => {
	const realDateNow = Date.now.bind(global.Date);
	const dateNowStub = mock.fn(() => 1530518207007);
	global.Date.now = dateNowStub;

	assert.equal(literallyJustDateNow(), 1530518207007);
	assert.equal(dateNowStub.mock.callCount(), 1);

	global.Date.now = realDateNow;
});
