import prisma from '../../lib/db';

export const applicationService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, status } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: any = {};
        if (status) where.status = status;

        const [data, total] = await Promise.all([
            prisma.application.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { applied_at: 'desc' },
                include: { job: { select: { id: true, title: true, job_id: true, job_type: true, remote_type: true } } },
            }),
            prisma.application.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findByJob: async (jobId: number, query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, status } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: any = { job_id: jobId };
        if (status) where.status = status;

        const [data, total] = await Promise.all([
            prisma.application.findMany({ where, skip, take: Number(limit), orderBy: { applied_at: 'desc' } }),
            prisma.application.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.application.findUnique({
            where: { id },
            include: { job: true },
        });
    },

    create: async (data: any) => {
        return prisma.application.create({ data });
    },

    updateStatus: async (id: number, status: string) => {
        return prisma.application.update({ where: { id }, data: { status: status as any } });
    },

    update: async (id: number, data: any) => {
        return prisma.application.update({ where: { id }, data });
    },

    remove: async (id: number) => {
        return prisma.application.update({ where: { id }, data: { deleted_at: new Date() } });
    },
};
