import { SvelteKitAuth } from "@auth/sveltekit";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } from "$env/static/private";
import Discord from "@auth/core/providers/discord";

export const { handle } = SvelteKitAuth({
	providers: [
		Discord({
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,
		}),
	],
	callbacks: {
		// JWT get sent to server?
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			//@ts-ignore
			session.access_token = token.accessToken;
			return session;
		},
		// JWT change -> session
	},
});
