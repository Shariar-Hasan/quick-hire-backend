import prisma from '../../lib/db';

export const categoryService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: any = { deleted_at: null };
        if (search) where.name = { contains: search, mode: 'insensitive' };

        const [data, total] = await Promise.all([
            prisma.category.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { name: 'asc' },
                include: { _count: { select: { jobs: true } } },
            }),
            prisma.category.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.category.findUnique({ where: { id } });
    },

    create: async (data: any) => {
        const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return prisma.category.create({ data: { ...data, slug } });
    },

    update: async (id: number, data: any) => {
        const updateData: any = { ...data };
        if (data.name) {
            updateData.slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }
        return prisma.category.update({ where: { id }, data: updateData });
    },

    remove: async (id: number) => {
        return prisma.category.update({ where: { id }, data: { deleted_at: new Date() } });
    },

    findAllForDropDown: async () => {
        const data = await prisma.category.findMany({
            where: { deleted_at: null },
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });
        return data.map(c => ({ id: c.id, label: c.name }));
    },
};
