import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "ship",
	"en-US": "ship",
};

const descriptionLocalizations = {
	"pt-BR": "Shipe duas pessoas e veja a compatibilidade!",
	"en-US": "Ship two people and see their compatibility!",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	category: "fun",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		
		// Get mentioned users or use random if none
		const mentions = interaction.options?.data?.find(option => option.name === 'user1' || option.name === 'user2');
		const user1 = interaction.user;
		const user2 = interaction.user; // Default to self if no second user
		
		// Generate ship name by combining usernames
		const shipName = user1.username.slice(0, Math.ceil(user1.username.length / 2)) + 
		                user2.username.slice(Math.floor(user2.username.length / 2));
		
		// Generate random compatibility percentage
		const compatibility = Math.floor(Math.random() * 101);
		
		// Compatibility messages
		const getCompatibilityMessage = (percent: number, locale: string) => {
			if (percent >= 90) {
				return locale === "pt-BR" ? "Perfeito! Almas gemeas!" : "Perfect! Soulmates!";
			} else if (percent >= 75) {
				return locale === "pt-BR" ? "Muito compativel! Grande potencial!" : "Very compatible! Great potential!";
			} else if (percent >= 50) {
				return locale === "pt-BR" ? "Boa compatibilidade!" : "Good compatibility!";
			} else if (percent >= 25) {
				return locale === "pt-BR" ? "Hmm... talvez como amigos?" : "Hmm... maybe as friends?";
			} else {
				return locale === "pt-BR" ? "Melhor manter distancia..." : "Better keep some distance...";
			}
		};
		
		// Compatibility bar
		const createBar = (percent: number) => {
			const filled = Math.floor(percent / 10);
			const empty = 10 - filled;
			return '█'.repeat(filled) + '░'.repeat(empty);
		};
		
		const compatMessage = getCompatibilityMessage(compatibility, local ?? "en-US");
		
		const responseText = local === "pt-BR" 
			? `**Ship: ${user1.username} x ${user2.username}**\n\n` +
			  `Nome do ship: **${shipName}**\n` +
			  `Compatibilidade: **${compatibility}%**\n` +
			  `${createBar(compatibility)}\n\n` +
			  `${compatMessage}`
			: `**Ship: ${user1.username} x ${user2.username}**\n\n` +
			  `Ship name: **${shipName}**\n` +
			  `Compatibility: **${compatibility}%**\n` +
			  `${createBar(compatibility)}\n\n` +
			  `${compatMessage}`;
		
		await interaction.reply(responseText);
	},
};
