import { test, before } from "node:test";
import assert from "node:assert/strict";
import esmock from "esmock";

let Model;
before(async () => {
	const { default: model } = await esmock("./02.04-model.js", {
		sequelize: {
			Model: class {},
		},
	});
	Model = model;
});

test("It should not throw when passed a model containing an empty list of meetings", () => {
	const model = new Model();
	model.meetings = [];
	assert.doesNotThrow(model.isAvailable.bind(model, new Date(Date.now())));
});

test("It should not throw when passed a model containing an empty list of meetings", () => {
	const model = Object.assign(new Model(), {
		meetings: [],
	});
	assert.doesNotThrow(model.isAvailable.bind(model, new Date(Date.now())));
});
