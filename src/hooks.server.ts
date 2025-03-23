import client from "$lib/discord";
import type { Handle } from "@sveltejs/kit";

console.log("Server is starting...");

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.client = client;
	return resolve(event);
};
