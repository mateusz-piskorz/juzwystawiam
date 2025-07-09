import { apiFetch } from '@/lib/utils/api-fetch';
import { CreateProductDTO } from '../constants/zod/product';
import { Pagination } from '../types/pagination';
import { Product } from '../types/product';
import { QueryValue } from '../types/query-value';
import { SharedQueryArgs } from '../types/shared-query-args';
import { buildURLParams } from '../utils/build-url-params';

const BASE_URL = '/api/products';

type GetProducts = SharedQueryArgs & {
    vat_rate?: QueryValue;
    measure_unit?: QueryValue;
};
type DeleteProduct = {
    productId: number;
};

export const getProducts = async (args: GetProducts) => {
    return await apiFetch<Pagination<Product>>(`${BASE_URL}?${args ? buildURLParams(args) : ''}`);
};

export const deleteProduct = async ({ productId }: DeleteProduct) => {
    return await apiFetch<{ message: 'Contractor deleted' }>(`${BASE_URL}/${productId}`, {
        method: 'DELETE',
    });
};

export const upsertProduct = async ({ body, productId }: { body: CreateProductDTO; productId?: number }) => {
    const url = productId ? `${BASE_URL}/${productId}` : BASE_URL;
    const method = productId ? 'PUT' : 'POST';

    return await apiFetch<Product>(url, { method, body: JSON.stringify(body) });
};
