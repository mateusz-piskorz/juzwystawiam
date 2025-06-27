import { apiFetch } from '@/lib/utils/api-fetch';
import { CreateInvoiceDTO } from '../constants/zod/invoices';
import { Pagination } from '../types';
import { Invoice } from '../types/invoice';
import { buildURLParams } from '../utils/build-url-params';

const BASE_URL = '/api/invoices';

type DeleteProduct = {
    invoiceId: number;
};

type GetInvoices = {
    limit?: number;
    page?: string;
};

export const getInvoices = async (args?: GetInvoices) => {
    return await apiFetch<Pagination<Invoice>>(`${BASE_URL}?${args ? buildURLParams(args) : ''}`);
};

export const deleteInvoice = async ({ invoiceId }: DeleteProduct) => {
    return await apiFetch<{ message: 'Invoice deleted' }>(`${BASE_URL}/${invoiceId}`, {
        method: 'DELETE',
    });
};

export const upsertInvoice = async ({ body, invoiceId }: { body: CreateInvoiceDTO; invoiceId?: number }) => {
    const url = invoiceId ? `${BASE_URL}/${invoiceId}` : BASE_URL;
    const method = invoiceId ? 'PUT' : 'POST';

    return await apiFetch<Invoice>(url, { method, body: JSON.stringify(body) });
};
