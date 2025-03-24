import { PrismaClient } from "@prisma/client";

// Prevent multiple PrismaClient instances in development
const globalForPrisma = global as { db?: PrismaClient };

// Check if we already have a connection to the database
const db = globalForPrisma.db || new PrismaClient();

// In development, save the db connection in the global object
if (process.env.NODE_ENV !== "production") {
	globalForPrisma.db = db;
}

export default db;
