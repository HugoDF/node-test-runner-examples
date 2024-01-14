import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import express, { Router } from "express";
// note that moxios doesn't work with axios version >1
import moxios from "moxios";
import request from "supertest";
import axios from "axios";

// @ts-ignore
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
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
		moxios.uninstall();
	});
	test("It should fetch HugoDF from GitHub", async () => {
		moxios.stubRequest(/api.github.com\/users/, {
			status: 200,
			response: {
				blog: "https://codewithhugo.com",
				location: "London",
				bio: "Developer, JavaScript",
				public_repos: 39,
			},
		});
		const app = initHugo();
		await request(app).get("/hugo");
		assert.equal(
			moxios.requests.mostRecent().url,
			"https://api.github.com/users/HugoDF",
		);
	});
	test("It should 200 and return a transformed version of GitHub response", async () => {
		moxios.stubRequest(/api.github.com\/users/, {
			status: 200,
			response: {
				blog: "https://codewithhugo.com",
				location: "London",
				bio: "Developer, JavaScript",
				public_repos: 39,
			},
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
