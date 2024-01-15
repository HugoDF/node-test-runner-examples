import { test } from "node:test";
import assert from "node:assert/strict";

test(
	"skips using config if environment variable is missing",
	{ skip: !process.env.REQUIRED_ENV_VARIABLE },
	() => {
		assert.fail("if we get here, we need REQUIRED_ENV_VARIABLE and fail");
	},
);

test("skips programmatically if environment variable is missing", (t) => {
	if (!process.env.REQUIRED_ENV_VARIABLE) {
		return t.skip("REQUIRED_ENV_VARIABLE is missing");
	}

	assert.fail(
		'If we got here the ".failing" modifier would not be satisfied since the test passed',
	);
});
