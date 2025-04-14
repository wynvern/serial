import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI,
} from "$env/static/private";
import db from "$lib/prisma";
import { fetchAccessToken, fetchGuilds, fetchUserData } from "$lib/redis";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
	const { session } = locals;
	const dcClient = locals.client;
	const code = url.searchParams.get("code");

	if (!code) {
		return new Response("Authorization code not found", { status: 400 });
	}

	const dataObject = {
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: "authorization_code" as const,
		code,
		redirect_uri: DISCORD_REDIRECT_URI,
		scope: "identify email guilds",
	};

	const accessToken = await fetchAccessToken(dataObject);
	const userData = await fetchUserData(accessToken);

	const upsertData = {
		username: userData.username,
		avatar: userData.avatar,
		discriminator: userData.discriminator,
		email: userData.email,
		verified: userData.verified,
		global_name: userData.global_name,
		locale: userData.locale,
		accent_color: userData.accent_color,
		banner_color: userData.banner_color,
		banner: userData.banner,
		access_token: accessToken,
	};

	const dbUser = await db.user.upsert({
		where: { id: userData.id },
		create: {
			id: userData.id,
			...upsertData,
		},
		update: {
			...upsertData,
		},
	});

	await session.setData({ user: dbUser });
	await session.save();

	const userGuilds = await fetchGuilds(accessToken);
	const ownedGuilds = userGuilds.filter(
		(guild: { owner: boolean }) => guild.owner,
	);

	let toSelectGuild = null;

	for (const guild of ownedGuilds) {
		const botInGuild = await dcClient.guilds.fetch(guild.id).catch(() => null);
		if (botInGuild) {
			toSelectGuild = guild;
			break;
		}
	}

	if (toSelectGuild) {
		return redirect(302, `/manage/${toSelectGuild.id}/dashboard`);
	}
	return redirect(302, "/add-me");
};
