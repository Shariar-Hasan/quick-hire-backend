import { Prisma } from '../../../generated/prisma/client';
import prisma from '../../lib/db';

export const jobService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search, status, job_type, remote_type } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: Prisma.JobWhereInput = {
            deleted_at: null,
        };
        if (search) where.title = { contains: search, mode: 'insensitive' };
        if (status) where.status = status;
        if (job_type) where.job_type = job_type;
        if (remote_type) where.remote_type = remote_type;

        const [data, total] = await Promise.all([
            prisma.job.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { created_at: 'desc' },
                include: { employer: { select: { id: true, name: true, email: true } } },
            }),
            prisma.job.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findAllWithAppliedCount: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10 } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const [data, total] = await Promise.all([
            prisma.job.findMany({
                where: { deleted_at: null },
                skip,
                take: Number(limit),
                orderBy: { created_at: 'desc' },
                include: { _count: { select: { applications: true } } },
            }),
            prisma.job.count({ where: { deleted_at: null } }),
        ]);

        return {
            data: data.map(j => ({ ...j, applications_count: j._count.applications })),
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.job.findUnique({
            where: { id, deleted_at: null },
            include: { employer: { select: { id: true, name: true, email: true } }, company: true },
        });
    },

    findByJobId: async (jobId: string) => {
        return prisma.job.findUnique({
            where: { job_id: jobId, deleted_at: null },
            include: { employer: { select: { id: true, name: true, email: true } }, company: true },
        });
    },

    create: async (data: any) => {
        return prisma.job.create({ data });
    },

    update: async (id: number, data: any) => {
        const { company_id, location_id, employer_id, ...rest } = data;
        return prisma.job.update({
            where: { id },
            data: {
                ...rest,
                ...(company_id != null && { company: { connect: { id: company_id } } }),
                ...(location_id != null && { location: { connect: { id: location_id } } }),
                ...(employer_id != null && { employer: { connect: { id: employer_id } } }),
            },
        });
    },

    remove: async (id: number) => {
        return prisma.job.update({ where: { id }, data: { deleted_at: new Date() } });
    },
};
