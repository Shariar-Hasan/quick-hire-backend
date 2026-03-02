import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password_hash: z.string().min(6).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
