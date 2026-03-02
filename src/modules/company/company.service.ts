import prisma from '../../lib/db';

export const companyService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = search
            ? { name: { contains: search, mode: 'insensitive' as const } }
            : {};

        const [data, total] = await Promise.all([
            prisma.company.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { created_at: 'desc' },
                include: { location: true },
            }),
            prisma.company.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.company.findUnique({
            where: { id },
            include: { location: true, employer: true },
        });
    },

    findByEmployer: async (employerId: number) => {
        return prisma.company.findUnique({
            where: { employer_id: employerId },
            include: { location: true },
        });
    },

    create: async (data: any) => {
        return prisma.company.create({ data });
    },

    update: async (id: number, data: any) => {
        return prisma.company.update({ where: { id }, data });
    },

    remove: async (id: number) => {
        return prisma.company.update({ where: { id }, data: { deleted_at: new Date() } });
    },

    findAllForDropDown: async () => {
        const data = await prisma.company.findMany({
            where: { deleted_at: null },
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });
        return data.map(c => ({ id: c.id, label: c.name }));
    },
};
