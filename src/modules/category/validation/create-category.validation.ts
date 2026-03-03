import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    description: z.string().optional(),
    logo_url: z.string().optional(),
    is_featured: z.coerce.boolean().optional().default(false),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
