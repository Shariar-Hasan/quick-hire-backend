import { z } from 'zod';

const JobTypeEnum = z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']);
const RemoteTypeEnum = z.enum(['ONSITE', 'REMOTE', 'HYBRID']);
const JobStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']);

export const updateJobSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    job_type: JobTypeEnum.optional(),
    remote_type: RemoteTypeEnum.optional(),
    status: JobStatusEnum.optional(),

    company_id: z.coerce.number().int().positive().optional(),
    location_id: z.coerce.number().int().positive().optional(),

    salary_min: z.coerce.number().positive().optional(),
    salary_max: z.coerce.number().positive().optional(),
    currency: z.string().optional(),

    is_featured: z.coerce.boolean().optional(),
    expires_at: z.coerce.date().optional(),
});

export type UpdateJobDto = z.infer<typeof updateJobSchema>;
