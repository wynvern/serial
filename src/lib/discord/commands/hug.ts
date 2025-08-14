import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "abraço",
	"en-US": "hug",
};

const descriptionLocalizations = {
	"pt-BR": "Dê um abraço apertadinho!",
	"en-US": "Give a warm hug!",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR": "*te dá um abraço bem apertadinho* Aww~ Você precisa de um abraço! (っ◔◡◔)っ ❤️",
	"en-US": "*gives you a warm, tight hug* Aww~ You need a hug! (っ◔◡◔)っ ❤️",
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
