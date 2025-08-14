import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "cafuné",
	"en-US": "pat",
};

const descriptionLocalizations = {
	"pt-BR": "Receba um cafuné carinhoso!",
	"en-US": "Get some gentle head pats!",
};

const responseLocalizations: Record<string, string> = {
	"pt-BR": "*ronrona e se encosta na sua mão* Mmm~ Cafuné! Mais um pouquinho? (˶ᵔ ᵕ ᵔ˶)",
	"en-US": "*purrs and leans into your hand* Mmm~ Head pats! A little more? (˶ᵔ ᵕ ᵔ˶)",
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
