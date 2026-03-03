import prisma from '../../lib/db';

export const companyService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: any = { deleted_at: null };
        if (search) where.name = { contains: search, mode: 'insensitive' };

        const [data, total] = await Promise.all([
            prisma.company.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { created_at: 'desc' },
                include: {
                    location: true,
                    _count: { select: { jobs: true } },
                },
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
        return prisma.company.findMany({
            where: { employer_id: employerId, deleted_at: null },
            include: { location: true },
            orderBy: { created_at: 'desc' },
        });
    },

    create: async (data: any) => {
        const { location_id, employer_id, ...rest } = data;
        return prisma.company.create({
            data: {
                ...rest,
                ...(employer_id != null && { employer: { connect: { id: employer_id } } }),
                ...(location_id != null && { location: { connect: { id: location_id } } }),
            },
        });
    },

    update: async (id: number, data: any) => {
        const { location_id, employer_id, ...rest } = data;
        return prisma.company.update({
            where: { id },
            data: {
                ...rest,
                ...(location_id != null && { location: { connect: { id: location_id } } }),
                ...(employer_id != null && { employer: { connect: { id: employer_id } } }),
            },
        });
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
