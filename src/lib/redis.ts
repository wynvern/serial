import { createClient, type RedisClientType } from "redis";
import * as discordApi from "./discord/api";

// Cache expiration times (in seconds)
const CACHE_EXPIRATION = {
	ACCESS_TOKEN: 7 * 24 * 60 * 60, // 7 days
	USER_DATA: 1 * 60 * 60, // 1 hour
	GUILDS: 30 * 60, // 30 minutes
};

const redisClient: RedisClientType = createClient();

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient
	.connect()
	.catch((err) => console.error("Redis Connection Error", err));

/**
 * Fetches guilds with Redis caching
 */
export async function fetchGuilds(accessToken: string) {
	const cacheKey = `guilds:${accessToken}`;

	// Try to get from cache first
	const cachedGuilds = await redisClient.get(cacheKey);
	if (cachedGuilds) {
		return JSON.parse(cachedGuilds);
	}

	// If not in cache, fetch from Discord API
	const guilds = await discordApi.fetchGuilds(accessToken);

	// Store in cache
	await redisClient.setEx(
		cacheKey,
		CACHE_EXPIRATION.GUILDS,
		JSON.stringify(guilds),
	);

	return guilds;
}

/**
 * Fetches and caches access token
 */
export async function fetchAccessToken(data: {
	client_id: string;
	client_secret: string;
	grant_type: "authorization_code";
	code: string;
	redirect_uri: string;
	scope: string;
}): Promise<string> {
	// OAuth tokens should be associated with the authorization code
	const cacheKey = `access_token:${data.code}`;

	// We typically don't cache access tokens from code exchange
	// as codes are one-time use, but we'll implement it anyway
	const cachedToken = await redisClient.get(cacheKey);
	if (cachedToken) {
		return cachedToken;
	}

	const accessToken = await discordApi.fetchAccessToken(data);

	// Store in cache
	await redisClient.setEx(cacheKey, CACHE_EXPIRATION.ACCESS_TOKEN, accessToken);

	return accessToken;
}

/**
 * Fetches and caches user data
 */
export async function fetchUserData(accessToken: string): Promise<any> {
	const cacheKey = `user:${accessToken}`;

	// Try to get from cache first
	const cachedUserData = await redisClient.get(cacheKey);
	if (cachedUserData) {
		return JSON.parse(cachedUserData);
	}

	// If not in cache, fetch from Discord API
	const userData = await discordApi.fetchUserData(accessToken);

	// Store in cache
	await redisClient.setEx(
		cacheKey,
		CACHE_EXPIRATION.USER_DATA,
		JSON.stringify(userData),
	);

	return userData;
}

/**
 * Invalidates all cached data for a user with the given access token
 */
export async function invalidateUserCache(accessToken: string): Promise<void> {
	const keys = [`user:${accessToken}`, `guilds:${accessToken}`];

	await Promise.all(keys.map((key) => redisClient.del(key)));
}

export default redisClient;
