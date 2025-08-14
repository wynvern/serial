import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "ronronar",
	"en-US": "purr",
};

const descriptionLocalizations = {
	"pt-BR": "Faça ronronar de felicidade!",
	"en-US": "Purr with happiness!",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR": "*ronrona alto* Prrrrr~ Estou tão feliz! ฅ(^◡^)ฅ",
	"en-US": "*purrs loudly* Prrrrr~ I'm so happy! ฅ(^◡^)ฅ",
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
