import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ locals }) => {
	const session = locals?.session?.data?.user;

	if (!session?.access_token) {
		throw new Error("Access token is missing from the session.");
	}

	const response = await fetch("https://discord.com/api/users/@me/guilds", {
		headers: {
			Authorization: `Bearer ${session.access_token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch guilds.");
	}

	const guilds = await response.json();
	const ownedGuilds = guilds.filter((guild) => guild.owner);

	return {
		guilds: {
			owned: ownedGuilds,
		},
	};
};
