import { test } from "node:test";
import assert from "node:assert/strict";

const mockObjectId = (data) => {
	const oid = {
		name: data,
	};
	Object.defineProperty(oid, "toString", {
		value: () => data,
	});
	return oid;
};

test("toString() returns right value", () => {
	assert.equal(mockObjectId("foo").toString(), "foo");
});
test("it’s an object", () => {
	const actual = mockObjectId("foo");
	assert.equal(typeof actual, "object");
});
test("two objectIds with same value are equal", () => {
	const first = mockObjectId("foo");
	const second = mockObjectId("foo");
	assert.deepEqual(first, second);
});
