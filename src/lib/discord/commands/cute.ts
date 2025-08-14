import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "fofo",
	"en-US": "cute",
};

const descriptionLocalizations = {
	"pt-BR": "O que?? Alguém é fofo!",
	"en-US": "Wha-? someone's cute!",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR":
		"Ei! Eu não sou fofo! Eu sou um bot poderoso! Uh... quero dizer, protogen!",
	"en-US": "Hey! I'm not cute! I'm a powerful bot! Uh... I mean, protogen!",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
   category: "interaction",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		await interaction.reply(responseLocalizations[local ?? "en-US"]);
	},
};
