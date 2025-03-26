import { createClient, type RedisClientType } from "redis";

const redisClient: RedisClientType = createClient();

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient
	.connect()
	.catch((err) => console.error("Redis Connection Error", err));

export default redisClient;
