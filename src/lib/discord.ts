import {
	ActivityType,
	Client,
	GatewayIntentBits,
	REST,
	Routes,
} from "discord.js";
import { DISCORD_TOKEN, DISCORD_CLIENT_ID } from "$env/static/private";

declare global {
	var discordClient: Client | undefined;
}

if (globalThis.discordClient) {
	console.log("Existing client found, destroying it...");
	globalThis.discordClient.destroy();
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once("ready", async () => {
	console.log("Bot is online!");

	const commands = [
		{
			name: "ping",
			description: "Replies with Pong!",
		},
	];

	const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
			body: commands,
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}

	client.user?.setActivity("cute furries", { type: ActivityType.Watching });
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "ping") {
		await interaction.reply("Pong!");
	}
});

client.on("messageCreate", (message) => {
	console.log(`[${message.author.tag}]: ${message.content}`);

	if (message.content === "hello") {
		message.reply("Hello! hii");
	}
});

process.on("SIGINT", () => {
	console.log("Shutting down...");
	client.destroy();
});

process.on("SIGTERM", () => {
	console.log("Shutting down...");
	client.destroy();
});

client.login(DISCORD_TOKEN);
globalThis.discordClient = client;

export default client;
