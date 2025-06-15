import { z } from 'zod';

export const createContractorDTO = z.object({
    is_own_company: z.boolean(),
    name: z.string().nonempty().max(255),
    nip: z
        .string()
        .nonempty()
        .refine((val) => val.length === 5),
    postal_code: z.string().nonempty().max(255),
    building_number: z.string().nonempty().max(255),
    city: z.string().nonempty().max(255),
    email: z.string().email().optional(),
    street_name: z.string().max(255).optional(),
    country: z.string().max(255).optional(),
    phone: z.string().optional(),
});

export type CreateContractorDTO = z.infer<typeof createContractorDTO>;
