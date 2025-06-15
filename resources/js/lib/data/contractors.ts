import { apiFetch } from '@/lib/utils/api-fetch';
import { Contractor, Nullable, Pagination, QueryValue } from '../types';
import { buildURLParams } from '../utils/build-url-params';

type GetContractors = {
    limit?: number;
    page?: string;
    nip?: QueryValue;
    name?: QueryValue;
    is_own_company?: QueryValue;
    id?: QueryValue;
};

type DeleteContractor = {
    contractorId: number;
};

export const getContractors = async (args?: GetContractors) => {
    return await apiFetch<Pagination<Contractor>>(`/api/contractors?${args ? buildURLParams(args) : ''}`);
};

export const deleteContractor = async ({ contractorId }: DeleteContractor) => {
    return await apiFetch<{ message: 'Contractor deleted' }>(`/api/contractors/${contractorId}`, {
        method: 'DELETE',
    });
};

type CreateContractorDTO = {
    is_own_company: boolean;
    name: string;
    nip: string;
    postal_code: string;
    building_number: string;
    city: string;
    street_name?: Nullable<string>;
    email?: Nullable<string>;
    country?: Nullable<string>;
    phone?: Nullable<string>;
};

export const upsertContractor = async ({ body, contractorId }: { body: CreateContractorDTO; contractorId?: number }) => {
    const url = contractorId ? `/api/contractors/${contractorId}` : '/api/contractors';
    const method = contractorId ? 'PUT' : 'POST';

    return await apiFetch<Contractor>(url, { method, body: JSON.stringify(body) });
};
