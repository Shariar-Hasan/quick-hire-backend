import { Prisma } from '../../../generated/prisma/client';
import prisma from '../../lib/db';

export const jobService = {
    findAll: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search, status, job_type, remote_type, location_id, category_id } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: Prisma.JobWhereInput = {
            deleted_at: null,
        };
        if (search) where.title = { contains: search, mode: 'insensitive' };
        if (status) where.status = status;
        if (job_type) where.job_type = job_type;
        if (remote_type) where.remote_type = remote_type;
        if (location_id) where.location_id = Number(location_id);
        if (category_id) where.category_id = Number(category_id);

        const [data, total] = await Promise.all([
            prisma.job.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { created_at: 'desc' },
                include: {
                    employer: { select: { id: true, name: true, email: true } },
                    company: true,
                    location: true,
                    category: true,
                },
            }),
            prisma.job.count({ where }),
        ]);

        return {
            data,
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findAllWithAppliedCount: async (query: Record<string, any> = {}) => {
        const { page = 1, limit = 10, search, company_id, location_id, status } = query;
        const skip = (Number(page) - 1) * Number(limit);

        const where: Prisma.JobWhereInput = { deleted_at: null };
        if (search) where.title = { contains: search, mode: 'insensitive' };
        if (status) where.status = status;
        if (company_id) where.company_id = Number(company_id);
        if (location_id) where.location_id = Number(location_id);

        const [data, total] = await Promise.all([
            prisma.job.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { created_at: 'desc' },
                include: { _count: { select: { applications: true } }, company: true, location: true, category: true },
            }),
            prisma.job.count({ where }),
        ]);

        return {
            data: data.map(j => ({ ...j, applications_count: j._count.applications })),
            meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
        };
    },

    findOne: async (id: number) => {
        return prisma.job.findUnique({
            where: { id, deleted_at: null },
            include: { employer: { select: { id: true, name: true, email: true } }, company: true, location: true, category: true },
        });
    },

    findByJobId: async (jobId: string) => {
        return prisma.job.findUnique({
            where: { job_id: jobId, deleted_at: null },
            include: { employer: { select: { id: true, name: true, email: true } }, company: true, location: true, category: true },
        });
    },

    create: async (data: any) => {
        return prisma.job.create({ data });
    },

    update: async (id: number, data: any) => {
        const { company_id, location_id, employer_id, category_id, ...rest } = data;
        return prisma.job.update({
            where: { id },
            data: {
                ...rest,
                ...(company_id != null && { company: { connect: { id: company_id } } }),
                ...(location_id != null && { location: { connect: { id: location_id } } }),
                ...(employer_id != null && { employer: { connect: { id: employer_id } } }),
                ...(category_id != null && { category: { connect: { id: category_id } } }),
            },
        });
    },

    remove: async (id: number) => {
        return prisma.job.update({ where: { id }, data: { deleted_at: new Date() } });
    },

    getAnalytics: async () => {
        const [
            totalJobs,
            publishedJobs,
            draftJobs,
            closedJobs,
            totalApplications,
            appliedCount,
            shortlistedCount,
            rejectedCount,
            hiredCount,
            recentApplications,
            topJobs,
        ] = await Promise.all([
            prisma.job.count({ where: { deleted_at: null } }),
            prisma.job.count({ where: { deleted_at: null, status: 'PUBLISHED' } }),
            prisma.job.count({ where: { deleted_at: null, status: 'DRAFT' } }),
            prisma.job.count({ where: { deleted_at: null, status: 'CLOSED' } }),
            prisma.application.count({}),
            prisma.application.count({ where: { status: 'APPLIED' } }),
            prisma.application.count({ where: { status: 'SHORTLISTED' } }),
            prisma.application.count({ where: { status: 'REJECTED' } }),
            prisma.application.count({ where: { status: 'HIRED' } }),
            prisma.application.findMany({
                orderBy: { applied_at: 'desc' },
                take: 6,
                include: {
                    job: { select: { id: true, title: true, job_id: true, job_type: true } },
                },
            }),
            prisma.job.findMany({
                where: { deleted_at: null },
                orderBy: { applications: { _count: 'desc' } },
                take: 5,
                select: {
                    id: true,
                    title: true,
                    job_id: true,
                    status: true,
                    company: { select: { name: true } },
                    _count: { select: { applications: true } },
                },
            }),
        ]);

        return {
            jobs: { total: totalJobs, published: publishedJobs, draft: draftJobs, closed: closedJobs },
            applications: {
                total: totalApplications,
                applied: appliedCount,
                shortlisted: shortlistedCount,
                rejected: rejectedCount,
                hired: hiredCount,
            },
            recentApplications,
            topJobs: topJobs.map(j => ({ ...j, applications_count: j._count.applications })),
        };
    },
};
