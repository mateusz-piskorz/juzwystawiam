import { z } from 'zod';

export const createContractorDTO = z.object({
    is_own_company: z.boolean(),
    company_name: z.string(),
    nip: z.string().nullish(),
    email: z.union([z.literal(''), z.string().email()]).nullish(),
    phone: z.string().nullish(),
    bank_account: z
        .string()
        .refine((val) => val.length >= 5 && val.length <= 17 && !isNaN(Number(val)))
        .nullish(),
    country: z.string().nullish(),
    postal_code: z.string().nullish(),
    city: z.string().nullish(),
    street_name: z.string().nullish(),
});

export type CreateContractorDTO = z.infer<typeof createContractorDTO>;
