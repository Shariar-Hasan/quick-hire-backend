import { z } from 'zod';

const ApplicationStatusEnum = z.enum(['APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED']);

export const updateApplicationSchema = z.object({
    cover_letter: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
    status: ApplicationStatusEnum,
});

export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>;
export type UpdateApplicationStatusDto = z.infer<typeof updateApplicationStatusSchema>;
