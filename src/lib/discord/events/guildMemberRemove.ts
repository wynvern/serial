import db from "$lib/prisma";
import type { GuildMember } from "discord.js";
import type { ClientEvent } from "../types";

export async function sendLeaveMessage(member: GuildMember) {
	try {
		const guildSettings = await db.guild.findUnique({
			where: { id: member.guild.id },
			select: { leave: true },
		});

		if (guildSettings?.leave) {
			const leaveSettings = guildSettings.leave as {
				enabled: boolean;
				message: string;
			};

			if (leaveSettings.enabled) {
				const farewellMessage = leaveSettings.message
					.replace("{user_name}", member.user.username)
					.replace("{server_name}", member.guild.name)
					.replace("{user_name}", member.user.username);

				const channelId = guildSettings.leave.channelId.value;
				const channel = await member.guild.channels.fetch(channelId);

				if (channel?.isTextBased()) {
					await channel.send(farewellMessage);
				} else {
					const systemChannel = member.guild.systemChannel;
					if (systemChannel) {
						await systemChannel.send(farewellMessage);
					}
				}
			}
		}
	} catch (error) {
		console.error("Error handling guildMemberRemove event:", error);
	}
}

// guildMemberRemove event
export const event: ClientEvent = {
	name: "guildMemberRemove",
	execute: async (member: GuildMember) => {
		await sendLeaveMessage(member);
	},
};
