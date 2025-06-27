import { apiFetch } from '@/lib/utils/api-fetch';
import { CreateProductDTO, Product } from '../constants/zod/products';
import { Pagination } from '../types';
import { buildURLParams } from '../utils/build-url-params';

const BASE_URL = '/api/products';

type DeleteProduct = {
    productId: number;
};

type GetProducts = {
    limit?: number;
    page?: string;
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
