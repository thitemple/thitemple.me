import { MAILER_LITE_TOKEN, MAILER_LITE_GROUP_ID } from "$env/static/private";

interface SubscriberData {
	email: string;
	fields?: Record<string, unknown>;
	groups?: string[];
	status?: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
}

interface Subscriber {
	id: string;
	email: string;
	status: string;
	created_at: string;
	updated_at: string;
}

interface MailerLiteError {
	message?: string;
}

/**
 * Creates a new subscriber in MailerLite
 * @param data - Subscriber data including email and optional fields
 * @returns Object containing subscriber ID and whether they're new
 */
async function createSubscriber(data: SubscriberData): Promise<{ id: string; isNew: boolean }> {
	if (!MAILER_LITE_TOKEN) {
		console.error("❌ MAILER_LITE_TOKEN environment variable is required");
		throw new Error("Missing required environment variable: MAILER_LITE_TOKEN");
	}

	const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const error: MailerLiteError = await response.json();
		throw new Error(`Failed to create subscriber: ${error.message || response.statusText}`);
	}

	const result: { data: Subscriber } = await response.json();
	const isNew = response.status === 201;

	return { id: result.data.id, isNew };
}

/**
 * Adds a subscriber to a specific MailerLite group
 * @param email - Subscriber's email address
 * @param groupId - MailerLite group ID
 * @returns Object indicating whether the subscriber is new
 */
async function addSubscriberToGroup(email: string, groupId: string): Promise<{ isNew: boolean }> {
	if (!MAILER_LITE_TOKEN) {
		console.error("❌ MAILER_LITE_TOKEN environment variable is required");
		throw new Error("Missing required environment variable: MAILER_LITE_TOKEN");
	}

	const { id: subscriberId, isNew } = await createSubscriber({ email });

	const response = await fetch(
		`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${groupId}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${MAILER_LITE_TOKEN}`,
				"Content-Type": "application/json"
			}
		}
	);

	if (!response.ok) {
		const error: MailerLiteError = await response.json();
		throw new Error(`Failed to add subscriber to group: ${error.message || response.statusText}`);
	}

	return { isNew };
}

/**
 * Handles newsletter subscription by adding email to the configured MailerLite group
 * @param email - Subscriber's email address
 * @returns Object indicating whether the subscriber is new
 */
export async function subscribeToNewsletter(email: string): Promise<{ isNew: boolean }> {
	if (!MAILER_LITE_GROUP_ID) {
		console.error("❌ MAILER_LITE_GROUP_ID environment variable is required");
		throw new Error("Missing required environment variable: MAILER_LITE_GROUP_ID");
	}

	const { isNew } = await addSubscriberToGroup(email, MAILER_LITE_GROUP_ID);
	return { isNew };
}

/**
 * Type guard to check if an error is a MailerLite API error
 */
export function isMailerLiteError(error: unknown): error is Error {
	return error instanceof Error;
}
