import { z } from 'zod';

const CompanySizeEnum = z.enum(['STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']);

export const createCompanySchema = z.object({
    name: z.string().min(1, 'Company name is required'),
    description: z.string().optional(),
    website: z.string().url('Must be a valid URL').optional(),
    logo_url: z.string().url('Must be a valid URL').optional(),
    industry: z.string().optional(),
    size: CompanySizeEnum.optional(),
    location_id: z.coerce.number().int().positive().optional(),
});

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
