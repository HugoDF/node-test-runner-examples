// @ts-nocheck
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import nock from "nock";

import express, { Router } from "express";
import axios from "axios";

const hugo = (router = new Router()) => {
	router.get("/hugo", async (request_, res) => {
		const { data: userData } = await axios.get(
			"https://api.github.com/users/HugoDF",
		);
		const { blog, location, bio, public_repos } = userData;
		return res.json({
			blog,
			location,
			bio,
			publicRepos: public_repos,
		});
	});
	return router;
};

const initHugo = () => {
	const app = express();
	app.use(hugo());
	return app;
};

describe("GET /hugo", () => {
	before(() => {
		nock.disableNetConnect();
		nock.enableNetConnect("127.0.0.1");
	});

	test("It should fetch HugoDF from GitHub", async () => {
		const ghMocks = nock("https://api.github.com");
		ghMocks.get("/users/HugoDF").reply(200, {
			blog: "https://codewithhugo.com",
			location: "London",
			bio: "Developer, JavaScript",
			public_repos: 39,
		});

		const app = initHugo();
		await request(app).get("/hugo");
		assert.equal(ghMocks.isDone(), true);
		assert.deepEqual(ghMocks.pendingMocks(), []);
		assert.deepEqual(ghMocks.activeMocks(), []);
	});
	test("It should 200 and return a transformed version of GitHub response", async () => {
		const ghMocks = nock("https://api.github.com");
		ghMocks.get("/users/HugoDF").reply(200, {
			blog: "https://codewithhugo.com",
			location: "London",
			bio: "Developer, JavaScript",
			public_repos: 39,
		});

		const app = initHugo();
		const res = await request(app).get("/hugo");

		assert.deepEqual(res.body, {
			blog: "https://codewithhugo.com",
			location: "London",
			bio: "Developer, JavaScript",
			publicRepos: 39,
		});
	});
});
