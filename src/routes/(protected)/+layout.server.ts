import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ locals }) => {
	const session = locals?.session?.data;

	if (!session?.user?.discord_id) {
		return redirect(303, "/signin");
	}

	if (!session?.user?.access_token) {
		throw new Error("Access token is missing from the session.");
	}

	const response = await fetch("https://discord.com/api/users/@me/guilds", {
		headers: {
			Authorization: `Bearer ${session.user.access_token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch guilds.");
	}

	const guilds = await response.json();
	const ownedGuilds = guilds.filter((guild) => guild.owner);

	// Safety
	const { access_token, email, ...filtered_session } = session;

	return {
		session: filtered_session,
		guilds: ownedGuilds,
	};
};
