import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import { subscribeToNewsletter } from "$lib/services/loops";

const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address")
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const result = emailSchema.safeParse(data);

		if (!result.success) {
			return json(
				{
					success: false,
					error: result.error.issues[0]?.message || "Invalid email"
				},
				{ status: 400 }
			);
		}

		await subscribeToNewsletter(result.data.email);

		return json({
			success: true,
			email: result.data.email
		});
	} catch (error) {
		console.error("Newsletter signup error:", error);
		return json(
			{
				success: false,
				error: "Failed to subscribe. Please try again."
			},
			{ status: 500 }
		);
	}
};
