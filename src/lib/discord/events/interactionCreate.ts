import type { Interaction } from "discord.js";
import { commands } from "../commands/index";
import type { ClientEvent } from "../types";

// interactionCreate event
export const event: ClientEvent = {
	name: "interactionCreate",
	execute: async (interaction: Interaction) => {
		if (!interaction.isCommand()) return;

		const { commandName } = interaction;
		const command = commands.find((cmd) => cmd.name === commandName);
		if (!command) return;

		command.execute(interaction);
	},
};
