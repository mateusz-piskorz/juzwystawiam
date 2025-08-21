import { z } from 'zod';
import { schemas } from './openapi.json.client';

export const createContractorDTO = z
    .object({
        type_of_business: schemas.TypeOfBusiness,
        is_own_company: z.boolean(),
        nip: z.string().nullish(),
        postal_code: z.string().nonempty(),
        city: z.string().nonempty(),
        country: z.string(),
        company_name: z.string().nullish(),
        email: z.union([z.literal(''), z.string().email()]).nullish(),
        street_name: z.string(),
        phone: z.string().nullish(),
        first_name: z.string().nullish(),
        surname: z.string().nullish(),
        bank_account: z
            .string()
            .refine((val) => val.length >= 5 && val.length <= 17 && !isNaN(Number(val)))
            .nullish(),
    })
    .refine(
        (data) => {
            if (data.type_of_business === 'SELF_EMPLOYED' || data.type_of_business === 'OTHER_BUSINESS') {
                return data.nip?.length === 10;
            }

            return true;
        },
        {
            message: 'required',
            path: ['nip'],
        },
    )
    .refine((data) => !(!data.company_name && (data.type_of_business === 'SELF_EMPLOYED' || data.type_of_business === 'OTHER_BUSINESS')), {
        message: 'required',
        path: ['company_name'],
    })
    .refine((data) => !(!data.first_name && (data.type_of_business === 'PRIVATE_PERSON' || data.type_of_business === 'SELF_EMPLOYED')), {
        message: 'required',
        path: ['first_name'],
    })
    .refine((data) => !(!data.surname && (data.type_of_business === 'PRIVATE_PERSON' || data.type_of_business === 'SELF_EMPLOYED')), {
        message: 'required',
        path: ['surname'],
    });

export type CreateContractorDTO = z.infer<typeof createContractorDTO>;
