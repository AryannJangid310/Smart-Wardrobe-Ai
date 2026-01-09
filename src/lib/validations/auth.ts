import { z } from 'zod';

export const userAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    name: z.string().min(2, "Name must be at least 2 characters long").optional(),
});

export const outfitGenerationSchema = z.object({
    itemIds: z.array(z.string()).min(2, "Must select at least 2 items"),
});
