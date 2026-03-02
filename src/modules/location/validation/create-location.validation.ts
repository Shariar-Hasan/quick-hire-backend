import { z } from 'zod';

export const createLocationSchema = z.object({
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    state: z.string().optional(),
    zip_code: z.string().optional(),
});

export type CreateLocationDto = z.infer<typeof createLocationSchema>;
