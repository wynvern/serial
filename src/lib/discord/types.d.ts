import type { CommandInteraction, ApplicationCommandData } from "discord.js";

export type ClientCommand = ApplicationCommandData & {
   category: string;
	execute: (interaction: CommandInteraction) => void;
};

export type ClientEvent = {
	name: string;
	execute: (...args) => Promise<void>;
};
