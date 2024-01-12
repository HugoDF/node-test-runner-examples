/* eslint-disable default-param-last, prefer-regex-literals */
const getPingConfigs = jest.fn().mockReturnValue([]);
const fetch = jest.fn().mockResolvedValue({});

async function getUrlsForAccount(accountId, offset, limit, searchRegex) {
	const configs = await getPingConfigs(accountId, offset, limit, searchRegex);
	return configs.map((conf) => conf.url);
}

async function pinger(accountId, { offset = 0, limit = 50 } = {}, search) {
	const searchRegex = search ? new RegExp(search.split(" ").join("|")) : /.*/;
	const urls = await getUrlsForAccount(accountId, offset, limit, searchRegex);
	return Promise.all(urls.map((url) => fetch(url)));
}

describe("without search", () => {
	test("calls getPingConfigs with right accountId, searchRegex", async () => {
		await pinger(1);
		expect(getPingConfigs).toHaveBeenCalledWith(
			1,
			expect.anything(),
			expect.anything(),
			/.*/,
		);
	});
});
describe("offset, limit", () => {
	test("calls getPingConfigs with passed offset and limit", async () => {
		await pinger(1, { offset: 20, limit: 100 });
		expect(getPingConfigs).toHaveBeenCalledWith(1, 20, 100, expect.anything());
	});
	test("calls getPingConfigs with default offset and limit if undefined", async () => {
		await pinger(1);
		expect(getPingConfigs).toHaveBeenCalledWith(1, 0, 50, expect.anything());
	});
});
describe("search", () => {
	describe("single-word search", () => {
		test("calls getPingConfigs with right accountId, searchRegex", async () => {
			await pinger(1, {}, "search");
			expect(getPingConfigs).toHaveBeenCalledWith(
				1,
				expect.anything(),
				expect.anything(),
				/search/,
			);
		});
	});
	describe("multi-word search", () => {
		test("calls getPingConfigs with right accountId, searchRegex", async () => {
			await pinger(1, {}, "multi word search");
			expect(getPingConfigs).toHaveBeenCalledWith(
				1,
				expect.anything(),
				expect.anything(),
				/multi|word|search/,
			);
		});
	});
});
