import db from "$lib/prisma";
import type { GuildMember } from "discord.js";
import type { ClientEvent } from "../types";

// guildMemberAdd event
export async function sendJoinMessage(member: GuildMember) {
	const guildSettings = await db.guild.findUnique({
		where: { id: member.guild.id },
		select: { join: true },
	});

	if (guildSettings?.join) {
		const joinSettings = guildSettings.join as {
			enabled: boolean;
			message: string;
		};

		if (joinSettings.enabled) {
			const welcomeMessage = joinSettings.message
				.replace("{user_mention}", `<@${member.id}>`)
				.replace("{server_name}", member.guild.name)
				.replace("{user_name}", member.user.username);

			const channelId = guildSettings.join.channelId.value;
			const channel = await member.guild.channels.fetch(channelId);

			if (channel?.isTextBased()) {
				await channel.send(welcomeMessage);
			} else {
				const systemChannel = member.guild.systemChannel;
				if (systemChannel) {
					await systemChannel.send(welcomeMessage);
				}
			}
		}
	}
}

export const event: ClientEvent = {
	name: "guildMemberAdd",
	execute: async (member: GuildMember) => {
		try {
			console.log("this event triggered");
			await sendJoinMessage(member);
		} catch (error) {
			console.error("Error handling guildMemberAdd event:", error);
		}
	},
};
