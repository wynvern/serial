import db from "$lib/prisma";
import { GuildMember } from "discord.js";
import type { ClientEvent } from "../types";

// guildMemberRemove event
export const event: ClientEvent = {
    name: "guildMemberRemove",
    execute: async (member: GuildMember) => {
        try {
            const guildSettings = await db.guild.findUnique({
                where: { id: member.guild.id },
                select: { leave: true },
            });

            console.log("guildMemberRemove event triggered");

            if (guildSettings?.leave) {
                const leaveSettings = guildSettings.leave as {
                    enabled: boolean;
                    message: string;
                };

                if (leaveSettings.enabled) {
                    const farewellMessage = leaveSettings.message
                        .replace("{user_name}", member.user.username)
                        .replace("{server_name}", member.guild.name);

                    const systemChannel = member.guild.systemChannel;
                    if (systemChannel) {
                        await systemChannel.send(farewellMessage);
                    }
                }
            }
        } catch (error) {
            console.error("Error handling guildMemberRemove event:", error);
        }
    },
};