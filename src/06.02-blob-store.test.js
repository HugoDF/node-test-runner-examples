// @ts-nocheck
import express, { Router } from "express";
import request from "supertest";

const blobStore = (redisClient, router = new Router()) => {
	router.get("/store/:key", async (req, res) => {
		const { key } = req.params;
		const value = req.query;
		await redisClient.setAsync(key, JSON.stringify(value));
		return res.send("Success");
	});
	router.get("/:key", async (req, res) => {
		const { key } = req.params;
		const rawData = await redisClient.getAsync(key);
		return res.json(JSON.parse(rawData));
	});
	return router;
};

import { describe, test, mock } from "node:test";
import assert from "node:assert/strict";

const defaultRedisClient = {
	getAsync: mock.fn(),
	setAsync: mock.fn(),
};
defaultRedisClient.getAsync.mock.mockImplementation(() => Promise.resolve());
defaultRedisClient.setAsync.mock.mockImplementation(() => Promise.resolve());

const initBlobStore = (mockRedisClient = defaultRedisClient) => {
	const app = express();
	app.use(blobStore(mockRedisClient));
	return app;
};

describe("GET /store/:key with params", () => {
	test("It should call redisClient.setAsync with key route parameter as key and stringified params as value", async () => {
		const mockRedisClient = {
			setAsync: mock.fn(),
		};
		mockRedisClient.setAsync.mock.mockImplementation(() => Promise.resolve());
		const app = initBlobStore(mockRedisClient);
		await request(app).get("/store/my-key?hello=world&foo=bar");
		assert.deepEqual(mockRedisClient.setAsync.mock.calls[0].arguments, [
			"my-key",
			'{"hello":"world","foo":"bar"}',
		]);
	});
});

describe("GET /:key", () => {
	test("It should call redisClient.getAsync with key route parameter as key", async () => {
		const mockRedisClient = {
			getAsync: mock.fn(),
		};
		mockRedisClient.getAsync.mock.mockImplementation(() =>
			Promise.resolve("{}"),
		);
		const app = initBlobStore(mockRedisClient);
		await request(app).get("/my-key");
		assert.deepEqual(mockRedisClient.getAsync.mock.calls[0].arguments, [
			"my-key",
		]);
	});
	test("It should return output of redisClient.getAsync with key route parameter as key", async () => {
		const mockRedisClient = {
			getAsync: mock.fn(),
		};
		mockRedisClient.getAsync.mock.mockImplementation(() =>
			Promise.resolve("{}"),
		);
		const app = initBlobStore(mockRedisClient);
		const response = await request(app).get("/my-key");
		assert.deepEqual(response.body, {});
	});
});
