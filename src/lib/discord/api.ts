export async function fetchGuilds(access_token: string) {
	try {
		const response = await fetch("https://discord.com/api/users/@me/guilds", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		if (!response.ok) {
			const errorDetails = await response.json();
			throw new Error(
				`Failed to fetch guilds: ${errorDetails.message || response.statusText}`,
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching guilds:", error);
		throw error;
	}
}

export async function fetchAccessToken(data: {
	client_id: string;
	client_secret: string;
	grant_type: "authorization_code";
	code: string;
	redirect_uri: string;
	scope: string;
}): Promise<string> {
	const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		body: new URLSearchParams(data),
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});

	if (!tokenResponse.ok) {
		throw new Error("Failed to fetch access token");
	}

	const tokenData = await tokenResponse.json();
	return tokenData.access_token;
}

export async function fetchUserData(accessToken: string): Promise<any> {
	const userResponse = await fetch("https://discord.com/api/users/@me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!userResponse.ok) {
		throw new Error("Failed to fetch user data");
	}

	return userResponse.json();
}
