import { sendJoinMessage } from "$lib/discord/events/guildMemberAdd";
import db from "$lib/prisma";
import { text, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ url, locals, params }) => {
	console.log(await db.user.findMany({ where: { id: "1" } }), "data");

	const { session } = locals;
	const { guild_id } = params;

	console.log(session.data);

	if (!session?.data?.user?.id) {
		return new Response(
			JSON.stringify({ error: "User ID is missing from the session." }),
			{
				status: 401,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	const guild = await locals.client.guilds.fetch(guild_id);
	const memberGuild = await guild.members.fetch(session.data.user.id);

	sendJoinMessage(memberGuild);

	return new Response(JSON.stringify({ data: session.data }), {
		headers: { "Content-Type": "application/json" },
	});
};
