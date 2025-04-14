import type { Guild } from "discord.js";
import type { ClientEvent } from "../types";
import db from "$lib/prisma";

// guildCreate event
export const event: ClientEvent = {
    name: "guildCreate",
    execute: async (guild: Guild) => {
        try {
            const existingGuild = await db.guild.findUnique({
                where: { id: guild.id },
            });

            if (!existingGuild) {
                await db.guild.create({
                    data: {
                        id: guild.id,
                    },
                });
                console.log(`Added guild ${guild.name} (${guild.id}) to the database.`);
            } else {
                console.log(`Guild ${guild.name} (${guild.id}) already exists in the database.`);
            }
        } catch (error) {
            console.error(`Failed to handle guildCreate for ${guild.name} (${guild.id}):`, error);
        }
    },
};