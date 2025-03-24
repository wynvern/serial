import type { CommandInteraction } from "discord.js";

export type ClientCommand = {
	name: string;
	description: string;
	execute: (interaction: CommandInteraction) => void;
};

export type ClientEvent = {
	name: string;
	execute: (...args) => Promise<void>;
};
