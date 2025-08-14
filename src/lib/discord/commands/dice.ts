import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "dado",
	"en-US": "dice",
};

const descriptionLocalizations = {
	"pt-BR": "Role dados virtuais com diferentes lados",
	"en-US": "Roll virtual dice with different sides",
};

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	category: "fun",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		
		// Random dice configuration
		const diceTypes = [4, 6, 8, 10, 12, 20];
		const numDice = Math.floor(Math.random() * 3) + 1; // 1-3 dice
		const diceType = diceTypes[Math.floor(Math.random() * diceTypes.length)];
		
		const rolls: number[] = [];
		let total = 0;
		
		for (let i = 0; i < numDice; i++) {
			const roll = Math.floor(Math.random() * diceType) + 1;
			rolls.push(roll);
			total += roll;
		}
		
		// Create visual dice representation
		const getDiceEmoji = (value: number): string => {
			const diceMap: { [key: number]: string } = {
				1: '[1]', 2: '[2]', 3: '[3]', 4: '[4]', 5: '[5]', 6: '[6]'
			};
			return diceMap[value] || `[${value}]`;
		};
		
		const diceDisplay = rolls.map(roll => getDiceEmoji(roll)).join(' ');
		const rollsText = rolls.join(' + ');
		
		const responseText = local === "pt-BR" 
			? `**Rolagem de Dados**\n\n` +
			  `**Configuracao:** ${numDice}d${diceType}\n` +
			  `**Resultados:** ${diceDisplay}\n` +
			  `**Calculo:** ${rollsText} = **${total}**\n\n` +
			  `Boa sorte com seus resultados!`
			: `**Dice Roll**\n\n` +
			  `**Configuration:** ${numDice}d${diceType}\n` +
			  `**Results:** ${diceDisplay}\n` +
			  `**Calculation:** ${rollsText} = **${total}**\n\n` +
			  `Good luck with your results!`;
		
		await interaction.reply(responseText);
	},
};
