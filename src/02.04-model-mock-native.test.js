import { describe, test, mock, before, after } from "node:test";
import assert from "node:assert/strict";

// mock.module() was added in 22.3.0
const supportsMockModule = (() => {
	const [major, minor, _patch] = process.versions.node.split(".");
	return parseInt(major, 10) >= 22 && parseInt(minor, 10) >= 3;
})();

let Model;
/** @type {ReturnType<typeof mock['module']>}*/
let modelMock;
describe("Class extends Mock - native", { skip: !supportsMockModule }, () => {
	before(async () => {
		modelMock = mock.module("sequelize", {
			namedExports: {
				Model: class {},
			},
		});

		const { default: model } = await import("./02.04-model.js");
		Model = model;
	});
	after(() => {
		modelMock.restore();
	});
	test("It should not throw when passed a model containing an empty list of meetings", async (t) => {
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
});
