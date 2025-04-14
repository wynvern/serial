import type { PageServerLoad } from './$types';
import db from '$lib/prisma';

export const load: PageServerLoad = async ({ params }) => {
    const { guild_id } = params;

    // Fetch the join and leave data for the guild
    const guild = await db.guild.findUnique({
        where: { id: guild_id },
        select: {
            join: true,
            leave: true,
        },
    });

    if (!guild) {
        throw new Error(`Guild with ID ${guild_id} not found`);
    }

    return {
        join: guild.join || {},
        leave: guild.leave || {},
    };
};