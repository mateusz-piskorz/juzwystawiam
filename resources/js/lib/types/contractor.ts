import { z } from 'zod';
import { schemas } from '../constants/zod/openapi.json.client';

export type Contractor = {
    id: number;
    user_id: number;
    type_of_business: z.infer<typeof schemas.TypeOfBusiness>;
    is_own_company: boolean;
    postal_code: string;
    city: string;
    country: string;
    company_name: string;
    nip: string | null;
    email: string | null;
    street_name: string;
    phone: string | null;
    first_name: string | null;
    surname: string | null;
    full_name: string | null;
    bank_account: string | null;
    updated_at: string; // Date
    created_at: string; // Date
};
