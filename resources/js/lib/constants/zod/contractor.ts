import { z } from 'zod';
import { TYPE_OF_BUSINESS } from '../enums/type-of-business';

const { OTHER_BUSINESS, PRIVATE_PERSON, SELF_EMPLOYED } = TYPE_OF_BUSINESS;

//todo: check if validation pass after you type in field and then remove everything
export const createContractorDTO = z
    .object({
        type_of_business: z.nativeEnum(TYPE_OF_BUSINESS),
        is_own_company: z.boolean(),
        nip: z
            .string()
            .refine((val) => val.length === 10)
            .nullish(),
        postal_code: z.string().nonempty().max(255),
        city: z.string().nonempty().max(255),
        country: z.string().max(255),
        company_name: z.string().nonempty().max(255).nullish(),
        email: z.union([z.literal(''), z.string().email()]).nullish(),
        street_name: z.string().max(255),
        phone: z.string().nullish(),
        first_name: z.string().max(255).nullish(),
        surname: z.string().max(255).nullish(),
        bank_account: z
            .string()
            .refine((val) => String(val).length >= 5 && String(val).length <= 17)
            .nullish(),
    })
    .refine((data) => !(!data.nip && (data.type_of_business === SELF_EMPLOYED || data.type_of_business === OTHER_BUSINESS)), {
        message: 'required',
        path: ['nip'],
    })
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
