import type { SessionStoreData, Store } from "svelte-kit-sessions";
import db from "./prisma";

class PrismaStore implements Store {
	async get(id: string): Promise<SessionStoreData | null> {
		const session = await db.session.findUnique({
			where: { id },
		});
		return session ? (session.data as unknown as SessionStoreData) : null;
	}

	async set(
		id: string,
		storeData: SessionStoreData,
		ttl: number,
	): Promise<void> {
		const expiresAt =
			ttl === Number.POSITIVE_INFINITY
				? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
				: new Date(Date.now() + ttl);

		console.log(expiresAt);
		await db.session.upsert({
			where: { id },
			update: { data: storeData as any, expiresAt },
			create: { id, data: storeData as any, expiresAt },
		});
	}

	async destroy(id: string): Promise<void> {
		await db.session.delete({
			where: { id },
		});
	}

	async touch(id: string, ttl: number): Promise<void> {
		const expiresAt =
			ttl === Number.POSITIVE_INFINITY
				? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
				: new Date(Date.now() + ttl);

		await db.session.update({
			where: { id },
			data: { expiresAt },
		});
	}
}

export default PrismaStore;
