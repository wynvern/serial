import type { ClientCommand } from "../types";

export const command: ClientCommand = {
	name: "cute",
	description: "cute!",
	execute: async (interaction) => {
		await interaction.reply(
			"Hey! I'm not cute! I'm a powerful bot! Uh... I mean, protogen!",
		);
	},
};
