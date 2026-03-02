import { z } from 'zod';

const UserRoleEnum = z.enum(['EMPLOYER', 'ADMIN']);

export const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Must be a valid email'),
    password_hash: z.string().min(6, 'Password must be at least 6 characters'),
    role: UserRoleEnum.optional().default('EMPLOYER'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
