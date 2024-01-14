export { sendNotification } from "./03.02-send-notification.js";

export const OPERATIONS = {
	SEND_EMAIL: "SEND_EMAIL",
	SEND_PUSH_NOTIFICATION: "SEND_PUSH_NOTIFICATION",
};

export function createEmailNotification(to, subject, content) {
	return {
		type: OPERATIONS.SEND_EMAIL,
		payload: {
			to,
			subject,
			content,
		},
	};
}

export function createPushNotification(to, title, content) {
	return {
		type: OPERATIONS.SEND_PUSH_NOTIFICATION,
		payload: {
			to,
			title,
			content,
		},
	};
}
