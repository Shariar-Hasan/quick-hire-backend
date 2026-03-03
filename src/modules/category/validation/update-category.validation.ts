import { z } from 'zod';

export const updateCategorySchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    logo_url: z.string().optional(),
    is_featured: z.coerce.boolean().optional(),
});

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
