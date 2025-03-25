import type { ClientCommand } from "../types";

export const command: ClientCommand = {
	name: "ping",
	description: "Ping!",
	execute: async (interaction) => {
		const ping = Date.now() - interaction.createdTimestamp;
		await interaction.reply(`Pong! hehe...\n\`${ping}ms\``);
	},
};
