import client from "$lib/discord/client";

import PrismaStore from "$lib/store";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { sveltekitSessionHandle } from "svelte-kit-sessions";

console.log("Server is starting...");

export const handleDiscord: Handle = async ({ event, resolve }) => {
	event.locals.client = client;
	return resolve(event);
};

export const handleAuth: Handle = sveltekitSessionHandle({
	secret: "abc",
	store: new PrismaStore(),
	cookie: {
		maxAge: 365 * 24 * 60 * 60 * 1000,
	},
});

export const handle = sequence(handleAuth, handleDiscord);
