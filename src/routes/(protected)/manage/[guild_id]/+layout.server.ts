import { fetchGuilds } from "$lib/redis";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const session = locals?.session?.data;
	const guildId = params.guild_id;

	const guilds = await fetchGuilds(session.user.access_token);
	const guild = guilds.find((g: { id: string }) => g.id === guildId);

	if (!guild) {
		throw new Error("Guild not found.");
	}

	return {
		guild,
	};
};
