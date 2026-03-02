import { z } from 'zod';

export const createApplicationSchema = z.object({
    job_id: z.coerce.number().int().positive('Job ID is required'),
    applicant_name: z.string().min(1, 'Applicant name is required'),
    applicant_email: z.string().email('Must be a valid email'),
    resume_url: z.string().url('Must be a valid URL'),
    cover_letter: z.string().optional(),
});

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>;
