import { fetchGuilds } from "$lib/discord/api";
import redis from "$lib/redis";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const session = locals?.session?.data;
	const guildId = params.guild_id;
	const cacheKey = `guilds:${session.user.access_token}`;

	let guilds: any;
	const cachedGuilds = await redis.get(cacheKey);

	if (cachedGuilds) {
		guilds = JSON.parse(cachedGuilds);
		console.log(guilds);
	} else {
		guilds = await fetchGuilds(session.user.access_token);
		await redis.set(cacheKey, JSON.stringify(guilds), {
			EX: 3600, // Cache expiration time in seconds (e.g., 1 hour)
		});
	}

	const guild = guilds.find((g: { id: string }) => g.id === guildId);

	if (!guild) {
		throw new Error("Guild not found.");
	}

	return {
		guild,
	};
};
