import prisma from '../../lib/db';

export const userService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = search
            ? { name: { contains: search, mode: 'insensitive' as const } }
            : {};

        const [data, total] = await Promise.all([
            prisma.user.findMany({ where, skip, take: Number(limit), orderBy: { created_at: 'desc' } }),
            prisma.user.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.user.findUnique({ where: { id } });
    },

    create: async (data: any) => {
        return prisma.user.create({ data });
    },

    update: async (id: number, data: any) => {
        return prisma.user.update({ where: { id }, data });
    },

    remove: async (id: number) => {
        return prisma.user.update({ where: { id }, data: { deleted_at: new Date() } });
    },

    getMyProfile: async (userId: number) => {
        return prisma.user.findUnique({
            where: { id: userId },
            include: { company: true },
        });
    },
};
