import prisma from '../../lib/db';

export const locationService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = search
            ? {
                OR: [
                    { city: { contains: search, mode: 'insensitive' as const } },
                    { country: { contains: search, mode: 'insensitive' as const } },
                ],
            }
            : {};

        const [data, total] = await Promise.all([
            prisma.location.findMany({ where, skip, take: Number(limit), orderBy: { city: 'asc' } }),
            prisma.location.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.location.findUnique({ where: { id } });
    },

    create: async (data: any) => {
        return prisma.location.create({ data });
    },

    update: async (id: number, data: any) => {
        return prisma.location.update({ where: { id }, data });
    },

    remove: async (id: number) => {
        return prisma.location.update({ where: { id }, data: { deleted_at: new Date() } });
    },

    findAllForDropDown: async () => {
        const data = await prisma.location.findMany({
            where: { deleted_at: null },
            select: { id: true, city: true, country: true },
            orderBy: { city: 'asc' },
        });
        return data.map(l => ({ id: l.id, label: `${l.city}, ${l.country}` }));
    },
};
