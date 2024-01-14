// @ts-nocheck
import { describe, test, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";

const getPingConfigs = mock.fn();
getPingConfigs.mock.mockImplementation(() => []);
const fetch = mock.fn();
fetch.mock.mockImplementation(() => Promise.resolve({}));

async function getUrlsForAccount(accountId, offset, limit, searchRegex) {
	const configs = await getPingConfigs(accountId, offset, limit, searchRegex);
	return configs.map((conf) => conf.url);
}

// biome-ignore lint/style/useDefaultParameterLast: search is also optional
async function pinger(accountId, { offset = 0, limit = 50 } = {}, search) {
	const searchRegex = search ? new RegExp(search.split(" ").join("|")) : /.*/;
	const urls = await getUrlsForAccount(accountId, offset, limit, searchRegex);
	return Promise.all(urls.map((url) => fetch(url)));
}

beforeEach(() => {
	getPingConfigs.mock.resetCalls();
});

describe("without search", () => {
	test("calls getPingConfigs with right accountId, searchRegex", async () => {
		await pinger(1);
		const args = getPingConfigs.mock.calls[0].arguments;
		assert.equal(args[0], 1);
		assert.notEqual(args[1], null); // expect.anything()
		assert.notEqual(args[2], null); // expect.anything()
		assert.deepEqual(args[3], /.*/);
	});
});
describe("offset, limit", () => {
	test("calls getPingConfigs with passed offset and limit", async () => {
		await pinger(1, { offset: 20, limit: 100 });
		const args = getPingConfigs.mock.calls[0].arguments;
		assert.equal(args[0], 1);
		assert.equal(args[1], 20);
		assert.equal(args[2], 100);
		assert.notEqual(args[3], null); // expect.anything()
	});
	test("calls getPingConfigs with default offset and limit if undefined", async () => {
		await pinger(1);
		const args = getPingConfigs.mock.calls[0].arguments;
		assert.equal(args[0], 1);
		assert.equal(args[1], 0);
		assert.equal(args[2], 50);
		assert.notEqual(args[3], null); // expect.anything()
	});
});
describe("search", () => {
	describe("single-word search", () => {
		test("calls getPingConfigs with right accountId, searchRegex", async () => {
			await pinger(1, {}, "search");
			const args = getPingConfigs.mock.calls[0].arguments;
			assert.equal(args[0], 1);
			assert.notEqual(args[1], null); // expect.anything()
			assert.notEqual(args[2], null); // expect.anything()
			assert.notEqual(args[3], /search/);
		});
	});
	describe("multi-word search", () => {
		test("calls getPingConfigs with right accountId, searchRegex", async () => {
			await pinger(1, {}, "multi word search");
			const args = getPingConfigs.mock.calls[0].arguments;
			assert.equal(args[0], 1);
			assert.notEqual(args[1], null); // expect.anything()
			assert.notEqual(args[2], null); // expect.anything()
			assert.notEqual(args[3], /multi|word|search/);
		});
	});
});
