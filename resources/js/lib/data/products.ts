import { apiFetch } from '@/lib/utils/api-fetch';
import { CreateProductDTO } from '../constants/zod/products';
import { Pagination, Product } from '../types';
import { buildURLParams } from '../utils/build-url-params';

type DeleteProduct = {
    productId: number;
};

type GetProducts = {
    limit?: number;
    page?: string;
};

export const getProducts = async (args: GetProducts) => {
    return await apiFetch<Pagination<Product>>(`/api/products?${args ? buildURLParams(args) : ''}`);
};

export const deleteProduct = async ({ productId }: DeleteProduct) => {
    return await apiFetch<{ message: 'Contractor deleted' }>(`/api/products/${productId}`, {
        method: 'DELETE',
    });
};

export const upsertProduct = async ({ body, productId }: { body: CreateProductDTO; productId?: number }) => {
    const url = productId ? `/api/products/${productId}` : '/api/products';
    const method = productId ? 'PUT' : 'POST';

    return await apiFetch<Product>(url, { method, body: JSON.stringify(body) });
};
