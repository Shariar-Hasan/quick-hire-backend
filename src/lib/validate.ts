import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

/**
 * Express middleware factory for request body validation using a Zod schema.
 *
 * Usage:
 *   router.post('/', validate(createLocationSchema), controller.create);
 */
export const validate = (schema: z.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        // Replace body with parsed (and coerced) data
        req.body = result.data;
        next();
    };
};
