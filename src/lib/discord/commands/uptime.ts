import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "uptime",
	"en-US": "uptime",
};

const descriptionLocalizations = {
	"pt-BR": "Mostrar há quanto tempo o bot está online",
	"en-US": "Show how long the bot has been online",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	category: "system",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		
		const uptimeSeconds = process.uptime();
		const days = Math.floor(uptimeSeconds / 86400);
		const hours = Math.floor((uptimeSeconds % 86400) / 3600);
		const minutes = Math.floor((uptimeSeconds % 3600) / 60);
		const seconds = Math.floor(uptimeSeconds % 60);
		
		const startTime = new Date(Date.now() - uptimeSeconds * 1000);
		
		const responseText = local === "pt-BR" 
			? `⏰ **Tempo Online** Miau~\n\n` +
			  `🕐 **Uptime:** \`${days}d ${hours}h ${minutes}m ${seconds}s\`\n` +
			  `🚀 **Iniciado em:** <t:${Math.floor(startTime.getTime() / 1000)}:F>\n` +
			  `💖 *Estou funcionando direitinho! Nyaa~*`
			: `⏰ **Online Time** Meow~\n\n` +
			  `🕐 **Uptime:** \`${days}d ${hours}h ${minutes}m ${seconds}s\`\n` +
			  `🚀 **Started at:** <t:${Math.floor(startTime.getTime() / 1000)}:F>\n` +
			  `💖 *I'm running smoothly! Nyaa~*`;
		
		await interaction.reply(responseText);
	},
};
