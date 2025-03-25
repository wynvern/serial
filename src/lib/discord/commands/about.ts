import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "serial",
	"en-US": "serial",
};

const descriptionLocalizations = {
	"pt-BR": "Saiba um pouco mais sobre mim!",
	"en-US": "Learn a little more about me!",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR":
		"Oi! Eu sou o Serial, um bot para Discord! Eu adoro ajudar e fazer coisas de Protogen. Isso me faz sentir bem!",
	"en-US":
		"Hey! I'm Serial, a Discord bot! I love helping and doing Protogen things. It makes me feel useful and fuzzy!",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		await interaction.reply(responseLocalizations[local ?? "en-US"]);
	},
};
