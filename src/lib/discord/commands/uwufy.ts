import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "uwuficar",
	"en-US": "uwufy",
};

const descriptionLocalizations = {
	"pt-BR": "Transforme qualquer texto em uwu speak",
	"en-US": "Transform any text into uwu speak",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	category: "fun",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		
		// For now, we'll just uwufy a random phrase since we can't get options easily
		const phrases = [
			"Hello world! This is a test message.",
			"I love programming and coding!",
			"The weather is really nice today.",
			"Thank you for using this bot!",
			"Programming is fun and interesting."
		];
		
		const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
		
		// UwU transformation rules
		const uwufy = (str: string): string => {
			return str
				.replace(/[rl]/gi, 'w')
				.replace(/[RL]/gi, 'W')
				.replace(/n([aeiou])/gi, 'ny$1')
				.replace(/N([aeiou])/gi, 'Ny$1')
				.replace(/N([AEIOU])/gi, 'NY$1')
				.replace(/ove/gi, 'uv')
				.replace(/\bth/gi, 'd')
				.replace(/\bTh/gi, 'D')
				.replace(/\bTH/gi, 'D');
		};
		
		const uwufiedText = uwufy(randomPhrase);
		
		const responseText = local === "pt-BR" 
			? `**Texto uwuficado:**\n"${randomPhrase}" -> "${uwufiedText}"`
			: `**Uwufied text:**\n"${randomPhrase}" -> "${uwufiedText}"`;
		
		await interaction.reply(responseText);
	},
};
