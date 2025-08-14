import type { ClientCommand } from "../types";
import os from "os";

const nameLocalizations = {
	"pt-BR": "status",
	"en-US": "status",
};

const descriptionLocalizations = {
	"pt-BR": "Mostrar informações do sistema e status do bot",
	"en-US": "Show system information and bot status",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	category: "system",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		
		// System info
		const totalMemory = os.totalmem();
		const freeMemory = os.freemem();
		const usedMemory = totalMemory - freeMemory;
		const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(1);
		
		const cpuCount = os.cpus().length;
		const uptime = os.uptime();
		const platform = os.platform();
		const arch = os.arch();
		
		// Process info
		const processMemory = process.memoryUsage();
		const processUptime = process.uptime();
		
		// Format uptime
		const formatUptime = (seconds: number) => {
			const days = Math.floor(seconds / 86400);
			const hours = Math.floor((seconds % 86400) / 3600);
			const mins = Math.floor((seconds % 3600) / 60);
			return `${days}d ${hours}h ${mins}m`;
		};
		
		const responseText = local === "pt-BR" 
			? `🤖 **Status do Sistema** Nyaa~\n\n` +
			  `**💻 Sistema:**\n` +
			  `• Plataforma: \`${platform} ${arch}\`\n` +
			  `• CPUs: \`${cpuCount} cores\`\n` +
			  `• RAM: \`${(usedMemory / 1024 / 1024 / 1024).toFixed(1)}GB / ${(totalMemory / 1024 / 1024 / 1024).toFixed(1)}GB (${memoryUsage}%)\`\n` +
			  `• Uptime: \`${formatUptime(uptime)}\`\n\n` +
			  `**🐱 Bot:**\n` +
			  `• Memória: \`${(processMemory.heapUsed / 1024 / 1024).toFixed(1)}MB\`\n` +
			  `• Uptime: \`${formatUptime(processUptime)}\`\n` +
			  `• Node.js: \`${process.version}\``
			: `🤖 **System Status** Meow~\n\n` +
			  `**💻 System:**\n` +
			  `• Platform: \`${platform} ${arch}\`\n` +
			  `• CPUs: \`${cpuCount} cores\`\n` +
			  `• RAM: \`${(usedMemory / 1024 / 1024 / 1024).toFixed(1)}GB / ${(totalMemory / 1024 / 1024 / 1024).toFixed(1)}GB (${memoryUsage}%)\`\n` +
			  `• Uptime: \`${formatUptime(uptime)}\`\n\n` +
			  `**🐱 Bot:**\n` +
			  `• Memory: \`${(processMemory.heapUsed / 1024 / 1024).toFixed(1)}MB\`\n` +
			  `• Uptime: \`${formatUptime(processUptime)}\`\n` +
			  `• Node.js: \`${process.version}\``;
		
		await interaction.reply(responseText);
	},
};
