import { z } from 'zod';

const JobTypeEnum = z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']);
const RemoteTypeEnum = z.enum(['ONSITE', 'REMOTE', 'HYBRID']);
const JobStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']);

export const createJobSchema = z
    .object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().min(1, 'Description is required'),
        job_type: JobTypeEnum,
        remote_type: RemoteTypeEnum.optional(),
        status: JobStatusEnum.optional().default('DRAFT'),

        company_id: z.coerce.number().int().positive().optional(),
        location_id: z.coerce.number().int().positive().optional(),
        category_id: z.coerce.number().int().positive().optional(),

        salary_min: z.coerce.number().positive().optional(),
        salary_max: z.coerce.number().positive().optional(),
        currency: z.string().optional(),

        tags: z.array(z.string()).default([]),

        is_featured: z.coerce.boolean().optional().default(false),
        expires_at: z.coerce.date().optional(),
    })
    .refine(
        (d) =>
            d.salary_min == null ||
            d.salary_max == null ||
            d.salary_max >= d.salary_min,
        { message: 'salary_max must be >= salary_min', path: ['salary_max'] }
    );

export type CreateJobDto = z.infer<typeof createJobSchema>;
