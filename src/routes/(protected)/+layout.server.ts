import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ locals }) => {
	const session = locals?.session?.data;

	if (!session?.user?.discord_id) {
		return redirect(303, "/signin");
	}

	return {
		session,
	};
};
