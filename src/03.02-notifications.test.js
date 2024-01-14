import { test, mock } from "node:test";
import assert from "node:assert/strict";
import esmock from "esmock";

test("access tests", async () => {
	const {
		OPERATIONS,
		createEmailNotification,
		createPushNotification,
		sendNotification,
	} = await esmock("./03.02-notifications.js", {
		"./03.02-send-notification.js": {
			sendNotification: mock.fn(),
		},
	});

	assert.deepEqual(OPERATIONS, {
		SEND_EMAIL: "SEND_EMAIL",
		SEND_PUSH_NOTIFICATION: "SEND_PUSH_NOTIFICATION",
	});
	assert.deepEqual(
		createEmailNotification(
			"hi@example.tld",
			"new email notification",
			"This is an email notification",
		),
		{
			type: "SEND_EMAIL",
			payload: {
				to: "hi@example.tld",
				subject: "new email notification",
				content: "This is an email notification",
			},
		},
	);
	assert.deepEqual(
		createPushNotification(
			"hi@example.tld",
			"new push notification",
			"This is a push notification",
		),
		{
			type: "SEND_PUSH_NOTIFICATION",
			payload: {
				to: "hi@example.tld",
				title: "new push notification",
				content: "This is a push notification",
			},
		},
	);

	sendNotification();

	assert.equal(sendNotification.mock.callCount(), 1);
});
