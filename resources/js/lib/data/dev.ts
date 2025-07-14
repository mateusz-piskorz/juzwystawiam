import { apiFetch } from '@/lib/utils/api-fetch';

const BASE_URL = '/api/dev';

export const getDev1 = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await apiFetch<any>(`${BASE_URL}/dev1`);
};
