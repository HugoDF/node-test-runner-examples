import { test, mock, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const mockFn = mock.fn();

function fnUnderTest(args1) {
  mockFn(args1);
}

beforeEach(() => {
  mock.reset();
});

test("Testing once", () => {
  fnUnderTest("first-call");
  assert
  expect(mockFn).toHaveBeenCalledWith("first-call");
  expect(mockFn).toHaveBeenCalledTimes(1);
});
test("Testing twice", () => {
  fnUnderTest("second-call");
  expect(mockFn).toHaveBeenCalledWith("second-call");
  expect(mockFn).toHaveBeenCalledTimes(1);
});
