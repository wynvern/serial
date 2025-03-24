import db from "$lib/prisma";
import { text, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
	console.log(await db.user.findMany({ where: { id: "1" } }), "data");

	const { session } = locals;

	console.log(session.data);

	// await session.setData({ text: "Hello, world!" });
	// await session.save();

	return new Response(JSON.stringify({ data: session.data }), {
		headers: { "Content-Type": "application/json" },
	});
};
