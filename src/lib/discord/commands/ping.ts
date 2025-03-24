import type { ClientCommand } from "../types";

export const command: ClientCommand = {
	name: "ping",
	description: "Ping!",
	execute: async (interaction) => {
		await interaction.reply("Pong! hehe...");
	},
};
