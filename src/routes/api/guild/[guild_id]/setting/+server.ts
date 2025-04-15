import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/prisma";

export const PATCH: RequestHandler = async ({ params, request }) => {
    const { guild_id } = params;

    if (!guild_id) {
        return new Response(JSON.stringify({ error: "Guild ID is required" }), { status: 400 });
    }

    try {
        const data = await request.json();

        const existingGuild = await db.guild.findUnique({
            where: { id: guild_id },
        });

        if (!existingGuild) {
            return new Response(JSON.stringify({ error: "Guild not found" }), { status: 404 });
        }

        const dataToUpdate = {
            ...existingGuild,
            ...data,
            id: undefined
        }

        const updatedGuild = await db.guild.update({
            where: { id: guild_id },
            data: dataToUpdate,
        });

        return new Response(JSON.stringify(updatedGuild), { status: 200 });
    } catch (error) {
        console.error("Error updating guild:", error);
        return new Response(JSON.stringify({ error: "Failed to update guild" }), { status: 500 });
    }
};