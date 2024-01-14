import { test, mock } from "node:test";
import assert from "node:assert/strict";

const format = mock.fn();
function getName(firstName, ...otherNames) {
	const restOfNames = otherNames.reduce(
		(acc, curr) => (acc ? `${acc} ${format(curr)}` : format(curr)),
		"",
	);
	return `${format(firstName)} ${restOfNames}`;
}

test("it should work for multiple calls using `onCall` parameter", () => {
	format.mock.mockImplementation(() => "default-format-output");
	format.mock.mockImplementationOnce(() => "formatted-other-name-1", 0);
	format.mock.mockImplementationOnce(() => "formatted-other-name-2", 1);
	format.mock.mockImplementationOnce(() => "formatted-first-name", 2);

	const actual = getName("first-name", "other-name-1", "other-name-2");

	assert.equal(format.mock.callCount(), 3);
	assert.equal(
		actual,
		"formatted-first-name formatted-other-name-1 formatted-other-name-2",
	);

	assert.equal(format(), "default-format-output");
});
