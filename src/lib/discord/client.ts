import { DISCORD_TOKEN } from "$env/static/private";
import { Client, GatewayIntentBits } from "discord.js";
import { events } from "./events/index";

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

for (const event of events) {
	client.on(event.name, event.execute);
}

client.login(DISCORD_TOKEN);
globalThis.discordClient = client;

export default client;
