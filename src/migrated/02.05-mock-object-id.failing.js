import { test } from 'node:test';
import assert from 'node:assert';

const mockObjectId = (data) => {
  return {
    name: data,
    toString: () => data,
  };
};

test("toString() returns right value", () => {
  assert.deepEqual(mockObjectId("foo").toString(), "foo");
});
test("it’s an object", () => {
  const actual = mockObjectId("foo");
  assert.deepEqual(typeof actual, "object");
});
test("two objectIds with same value are equal", () => {
  const first = mockObjectId("foo");
  const second = mockObjectId("foo");
  assert.deepEqual(first, second);
});
