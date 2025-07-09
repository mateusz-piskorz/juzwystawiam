import { apiFetch } from '@/lib/utils/api-fetch';
import { CreateContractorDTO } from '../constants/zod/contractor';
import { Contractor } from '../types/contractor';
import { Pagination } from '../types/pagination';
import { QueryValue } from '../types/query-value';
import { SharedQueryArgs } from '../types/shared-query-args';
import { buildURLParams } from '../utils/build-url-params';

const BASE_URL = '/api/contractors';

type GetContractors = SharedQueryArgs & {
    is_own_company?: QueryValue;
    type_of_business?: QueryValue;
};
type DeleteContractor = {
    contractorId: number;
};

export const getContractors = async (args?: GetContractors) => {
    return await apiFetch<Pagination<Contractor>>(`${BASE_URL}?${args ? buildURLParams(args) : ''}`);
};

export const deleteContractor = async ({ contractorId }: DeleteContractor) => {
    return await apiFetch<{ message: 'Contractor deleted' }>(`${BASE_URL}/${contractorId}`, {
        method: 'DELETE',
    });
};

export const upsertContractor = async ({ body, contractorId }: { body: CreateContractorDTO; contractorId?: number }) => {
    const url = contractorId ? `${BASE_URL}/${contractorId}` : BASE_URL;
    const method = contractorId ? 'PUT' : 'POST';

    return await apiFetch<Contractor>(url, { method, body: JSON.stringify(body) });
};
