import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = locals?.session?.data as any;

	if (!session?.user?.id) {
		return redirect(303, "/signin");
	}

	if (!session?.user?.access_token) {
		throw new Error("Access token is missing from the session.");
	}

	// Safety
	const { access_token, email, ...filtered_session } = session;

	return {
		session: filtered_session,
	};
};
