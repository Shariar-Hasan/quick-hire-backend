import { z } from 'zod';

export const updateLocationSchema = z.object({
    city: z.string().min(1, 'City is required').optional(),
    country: z.string().min(1, 'Country is required').optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
});

export type UpdateLocationDto = z.infer<typeof updateLocationSchema>;
