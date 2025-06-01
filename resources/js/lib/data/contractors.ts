import { apiFetch } from '@/lib/utils/api-fetch';
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

export const getContractors = async (args?: GetContractors) => {
    return await apiFetch<Pagination<Contractor>>(`/api/contractors/?${args ? buildURLParams(args) : ''}`);
};
