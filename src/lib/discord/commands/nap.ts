import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "soneca",
	"en-US": "nap",
};

const descriptionLocalizations = {
	"pt-BR": "Hora da soneca! ZzZ...",
	"en-US": "Time for a nap! ZzZ...",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR": "*se enrola em uma bolinha e fecha os olhos* ZzZ... *ronrona baixinho* Boa noite~ (˘▾˘)~♪",
	"en-US": "*curls up in a ball and closes eyes* ZzZ... *soft purring* Good night~ (˘▾˘)~♪",
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
