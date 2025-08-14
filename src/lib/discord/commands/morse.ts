import type { ClientCommand } from "../types";

const nameLocalizations = {
	"pt-BR": "morse",
	"en-US": "morse",
};

const descriptionLocalizations = {
	"pt-BR": "Converta texto para codigo morse ou vice-versa",
	"en-US": "Convert text to morse code or vice versa",
};

const morseCode: { [key: string]: string } = {
	'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
	'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
	'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
	'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
	'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
	'4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
	'9': '----.', '0': '-----', ' ': '/'
};

const reverseMorse: { [key: string]: string } = {};
Object.keys(morseCode).forEach(key => {
	reverseMorse[morseCode[key]] = key;
});

export const command: ClientCommand = {
	name: nameLocalizations["en-US"],
	category: "fun",
	nameLocalizations,
	descriptionLocalizations,
	description: descriptionLocalizations["en-US"],
	execute: async (interaction) => {
		const local = interaction.guild?.preferredLocale;
		
		// Sample text for demonstration
		const sampleTexts = [
			"HELLO WORLD",
			"SOS",
			"MORSE CODE",
			"DISCORD BOT",
			"PROGRAMMING"
		];
		
		const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
		
		// Convert to morse
		const textToMorse = (text: string): string => {
			return text.toUpperCase()
				.split('')
				.map(char => morseCode[char] || char)
				.join(' ');
		};
		
		// Convert from morse
		const morseToText = (morse: string): string => {
			return morse.split(' ')
				.map(code => reverseMorse[code] || code)
				.join('');
		};
		
		const morseResult = textToMorse(randomText);
		const backToText = morseToText(morseResult);
		
		const responseText = local === "pt-BR" 
			? `**Conversor de Codigo Morse**\n\n` +
			  `**Texto original:** ${randomText}\n` +
			  `**Codigo morse:** ${morseResult}\n` +
			  `**De volta ao texto:** ${backToText}\n\n` +
			  `Funciona nos dois sentidos!`
			: `**Morse Code Converter**\n\n` +
			  `**Original text:** ${randomText}\n` +
			  `**Morse code:** ${morseResult}\n` +
			  `**Back to text:** ${backToText}\n\n` +
			  `Works both ways!`;
		
		await interaction.reply(responseText);
	},
};
