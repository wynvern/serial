import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI,
} from "$env/static/private";
import db from "$lib/prisma";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
	const { session } = locals;
	const code = url.searchParams.get("code");

	if (!code) {
		return new Response("Authorization code not found", { status: 400 });
	}

	const dataObject = {
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: "authorization_code",
		code,
		redirect_uri: DISCORD_REDIRECT_URI,
		scope: "identify email guilds",
	};

	const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		body: new URLSearchParams(dataObject),
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});

	if (!tokenResponse.ok) {
		return new Response("Failed to fetch access token", { status: 500 });
	}

	const tokenData = await tokenResponse.json();
	const accessToken = tokenData.access_token;

	const userResponse = await fetch("https://discord.com/api/users/@me", {
		headers: {
			Authorization: `Bearer ${accessToken}`, // save this token in the session
		},
	});

	if (!userResponse.ok) {
		return new Response("Failed to fetch user data", { status: 500 });
	}

	const userData = await userResponse.json();
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
			discord_id: userData.id,
			id: userData.id,
			...upsertData,
		},
		update: {
			...upsertData,
		},
	});

	await session.setData({ user: dbUser });
	await session.save();

	return redirect(302, "/dashboard");
};
