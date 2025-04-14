import db from "$lib/prisma";
import { GuildMember } from "discord.js";
import type { ClientEvent } from "../types";

// guildMemberAdd event
export const event: ClientEvent = {
  name: "guildMemberAdd",
  execute: async (member: GuildMember) => {
    try {
      const guildSettings = await db.guild.findUnique({
        where: { id: member.guild.id },
        select: { join: true },
      });

      console.log("this event triggered");

      if (guildSettings?.join) {
        const joinSettings = guildSettings.join as {
          enabled: boolean;
          message: string;
        };

        if (joinSettings.enabled) {
          const welcomeMessage = joinSettings.message
            .replace("{user_mention}", `<@${member.id}>`)
            .replace("{server_name}", member.guild.name);

          const systemChannel = member.guild.systemChannel;
          if (systemChannel) {
            await systemChannel.send(welcomeMessage);
          }
        }
      }
    } catch (error) {
      console.error("Error handling guildMemberAdd event:", error);
    }
  },
};
