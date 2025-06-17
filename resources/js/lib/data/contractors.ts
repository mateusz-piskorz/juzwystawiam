import { apiFetch } from '@/lib/utils/api-fetch';
import { CreateContractorDTO } from '../constants/zod/contractors';
import { Contractor, Pagination, QueryValue } from '../types';
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

export const upsertContractor = async ({ body, contractorId }: { body: CreateContractorDTO; contractorId?: number }) => {
    const url = contractorId ? `/api/contractors/${contractorId}` : '/api/contractors';
    const method = contractorId ? 'PUT' : 'POST';

    return await apiFetch<Contractor>(url, { method, body: JSON.stringify(body) });
};
