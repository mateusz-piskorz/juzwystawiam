import { TypeOfBusiness } from '../constants/enums/type-of-business';

export type Contractor = {
    id: number;
    user_id: number;
    type_of_business: TypeOfBusiness;
    is_own_company: boolean;
    postal_code: string;
    building_number: string;
    city: string;
    country: string;
    bank_account: string | null;
    nip: string | null;
    company_name: string | null;
    email: string | null;
    street_name: string | null;
    phone: string | null;
    first_name: string | null;
    surname: string | null;
    updated_at: string; // Date
    created_at: string; // Date
};
