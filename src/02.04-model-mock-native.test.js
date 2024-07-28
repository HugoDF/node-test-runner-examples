import { describe, test, mock, before } from "node:test";
import assert from "node:assert/strict";

let Model;
/**
 * mock.module() was added in 22.3.0
 */
const isNode22Point3OrLower = (() => {
	const [major, minor, _patch] = process.versions.node.split(".");
	return !(parseInt(major, 10) >= 22 && parseInt(minor, 10) >= 3);
})();
describe('Class extends Mock - native', {skip: isNode22Point3OrLower }, () => {
	test("It should not throw when passed a model containing an empty list of meetings", async () => {
		mock.module('sequelize', {
			namedExports: {
				Model: class { }
			}
		});

		const { default: _model } = await import(`./02.04-model.js?ts=${Date.now()}`);
		Model = _model;

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

})
