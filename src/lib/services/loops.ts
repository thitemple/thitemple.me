import * as env from "$env/static/private";
import { APIError, LoopsClient } from "loops";

const privateEnv = env as Record<string, string | undefined>;
const LOOPS_API_KEY = privateEnv.LOOPS_API_KEY;

const getMissingApiKeyError = (): Error =>
	new Error("Missing required environment variable: LOOPS_API_KEY");

const getLoopsApiErrorMessage = (error: APIError): string => {
	if (error.json && "message" in error.json && typeof error.json.message === "string") {
		return error.json.message;
	}

	return error.message;
};

export async function subscribeToNewsletter(email: string): Promise<void> {
	if (!LOOPS_API_KEY) {
		console.error("LOOPS_API_KEY environment variable is required");
		throw getMissingApiKeyError();
	}

	const client = new LoopsClient(LOOPS_API_KEY);

	try {
		await client.updateContact({ email });
	} catch (error) {
		if (error instanceof APIError) {
			throw new Error(
				`Failed to update contact: ${getLoopsApiErrorMessage(error)} (status ${error.statusCode})`
			);
		}

		if (error instanceof Error) {
			throw new Error(`Failed to update contact: ${error.message}`);
		}

		throw new Error("Failed to update contact: Unknown provider error");
	}
}
