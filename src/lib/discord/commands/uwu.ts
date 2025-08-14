import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "mimimi",
	"en-US": "uwu",
};

const descriptionLocalizations = {
	"pt-BR": "Seja fofinho como eu! UwU",
	"en-US": "Be as cute as me! UwU",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR": "UwU~ *faz carinha fofa* Você também é muito fofinho! Nyaa~ (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
	"en-US": "UwU~ *makes cute face* You're so cute too! Nyaa~ (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
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
