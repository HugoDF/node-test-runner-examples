// @ts-nocheck
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { MockAgent, setGlobalDispatcher } from "undici";

import express, { Router } from "express";

const hugo = (router = new Router()) => {
	router.get("/hugo", async (_request, res) => {
		const userData = await fetch("https://api.github.com/users/HugoDF").then(
			(res) => res.json(),
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

const mockAgent = new MockAgent();

describe("GET /hugo", () => {
	before(() => {
		mockAgent.disableNetConnect();
		mockAgent.enableNetConnect("127.0.0.1");
		setGlobalDispatcher(mockAgent);
	});

	after(async () => {
		await mockAgent.close();
	});

	test("It should fetch HugoDF from GitHub", async () => {
		mockAgent
			.get("https://api.github.com")
			.intercept({ path: "/users/HugoDF" })
			.reply(200, {
				blog: "https://codewithhugo.com",
				location: "London",
				bio: "Developer, JavaScript",
				public_repos: 39,
			});

		const app = initHugo();
		await request(app).get("/hugo");

		mockAgent.assertNoPendingInterceptors();
		assert.deepEqual(mockAgent.pendingInterceptors(), []);
	});
	test("It should 200 and return a transformed version of GitHub response", async () => {
		const ghMocks = mockAgent.get("https://api.github.com");
		ghMocks.intercept({ path: "/users/HugoDF" }).reply(200, {
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
