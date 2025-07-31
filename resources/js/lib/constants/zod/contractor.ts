import { z } from 'zod';
import { TYPE_OF_BUSINESS } from '../enums/type-of-business';

const { OTHER_BUSINESS, PRIVATE_PERSON, SELF_EMPLOYED } = TYPE_OF_BUSINESS;

export const createContractorDTO = z
    .object({
        type_of_business: z.nativeEnum(TYPE_OF_BUSINESS),
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
            .refine((val) => String(val).length >= 5 && String(val).length <= 17)
            .nullish(),
    })
    .refine(
        (data) => {
            if (data.type_of_business === SELF_EMPLOYED || data.type_of_business === OTHER_BUSINESS) {
                return data.nip?.length === 10;
            }

            return true;
        },
        {
            message: 'required',
            path: ['nip'],
        },
    )
    .refine((data) => !(!data.company_name && (data.type_of_business === SELF_EMPLOYED || data.type_of_business === OTHER_BUSINESS)), {
        message: 'required',
        path: ['company_name'],
    })
    .refine((data) => !(!data.first_name && (data.type_of_business === PRIVATE_PERSON || data.type_of_business === SELF_EMPLOYED)), {
        message: 'required',
        path: ['first_name'],
    })
    .refine((data) => !(!data.surname && (data.type_of_business === PRIVATE_PERSON || data.type_of_business === SELF_EMPLOYED)), {
        message: 'required',
        path: ['surname'],
    });

export type CreateContractorDTO = z.infer<typeof createContractorDTO>;
