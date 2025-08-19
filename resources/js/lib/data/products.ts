// import { apiFetch } from '@/lib/utils/api-fetch';
import { z } from 'zod';
import { api, schemas } from '../constants/zod/openapi.json.client';
// import { Pagination } from '../types/pagination';
// import { Product } from '../types/product';
// import { buildURLParams } from '../utils/build-url-params';

// type GetProducts = SharedQueryArgs & {
//     vat_rate?: QueryValue;
//     measure_unit?: QueryValue;
// };

// type MyQueries = NonNullable<Parameters<(typeof api)['products.index']>[0]>['queries'];

type myType = {
    measure_unit?: string | string[] | null;
    vat_rate?: string | string[] | null;
    sort?: 'price' | 'measure_unit' | 'vat_rate' | null;
    limit?: number | null;
    q?: string | null;
    sort_direction?: 'asc' | 'desc' | null;
    page?: string;
};

export const getProducts = async (queries: myType) => {
    return await api['products.index']({ queries });
    // return await apiFetch<Pagination<Product>>(`${route('api.products.index')}?${args ? buildURLParams(args) : ''}`);
};

export const deleteProduct = async ({ productId }: { productId: number }) => {
    return await api['products.destroy'](undefined, { params: { product: productId } });
};

export const upsertProduct = async ({ body, productId }: { body: z.infer<(typeof schemas)['UpsertProductRequest']>; productId?: number }) => {
    if (productId) {
        return await api['products.update'](body, { params: { product: productId } });
    }
    return await api['products.store'](body);
};
