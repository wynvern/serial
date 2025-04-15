import type { PageServerLoad } from './$types';
import db from '$lib/prisma';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { guild_id } = params;
    const dcClient = locals.client;

    // Fetch the join and leave data for the guild
    const guild = await db.guild.findUnique({
        where: { id: guild_id },
        select: {
            join: true,
            leave: true,
        },
    });

    // Fetch guild channels
    const channels = dcClient.guilds.cache.get(guild_id)?.channels.cache
        .filter((c: { type: number }) => c.type === 0)
        .map((c: { name: string; id: string }) => ({ name: c.name, id: c.id }))

    if (!guild) {
        throw new Error(`Guild with ID ${guild_id} not found`);
    }

    return {
        join: guild.join as { enabled: boolean; message: string; channelId: string} || { enabled: false, message: '', channelId: "" },
        leave: guild.leave as { enabled: boolean; message: string; channelId: string} || { enabled: false, message: '', channelId: "" },
        channels: channels || [],
    };
};