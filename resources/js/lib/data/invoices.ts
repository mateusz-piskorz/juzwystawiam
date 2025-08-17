import { apiFetch } from '@/lib/utils/api-fetch';
import { InvoiceSchema } from '../constants/zod/invoice';
import { Invoice } from '../types/invoice';
import { Pagination } from '../types/pagination';
import { QueryValue } from '../types/query-value';
import { SharedQueryArgs } from '../types/shared-query-args';
import { buildURLParams } from '../utils/build-url-params';

type DeleteProduct = {
    invoiceId: number;
};

type GetInvoices = SharedQueryArgs & {
    type?: QueryValue;
    is_already_paid?: QueryValue;
};

export const getInvoices = async (args?: GetInvoices) => {
    return await apiFetch<Pagination<Invoice>>(`${route('api.invoices.index')}?${args ? buildURLParams(args) : ''}`);
};

export const deleteInvoice = async ({ invoiceId }: DeleteProduct) => {
    return await apiFetch<{ message: 'Invoice deleted' }>(route('api.invoices.destroy', invoiceId), {
        method: 'DELETE',
    });
};

export const upsertInvoice = async ({ body, invoiceId }: { body: InvoiceSchema; invoiceId?: number }) => {
    const url = invoiceId ? route('api.invoices.update', invoiceId) : route('api.invoices.store');
    const method = invoiceId ? 'PUT' : 'POST';

    return await apiFetch<Invoice>(url, { method, body: JSON.stringify(body) });
};

type SendEmailIssuingInvoiceDTO = {
    recipient: string;
};

export const sendEmailIssuingInvoice = async ({ body, invoiceId }: { body: SendEmailIssuingInvoiceDTO; invoiceId?: number }) => {
    return await apiFetch<{ message: 'Invoice sent' }>(route('api.invoices.send-email', invoiceId), {
        method: 'POST',
        body: JSON.stringify(body),
    });
};

type GetChartData = {
    period?: QueryValue;
    product?: QueryValue;
};

export const getStatusMonthlyDistribution = async (args?: GetChartData) => {
    return await apiFetch<{ months: { month: string; paid: number; unpaid: number }[]; overall: { total: number; paid: number; unpaid: number } }>(
        `${route('api.invoices.status-monthly-series')}?${args ? buildURLParams(args) : ''}`,
        {
            method: 'GET',
        },
    );
};

export const getStatusYearlyDistribution = async () => {
    return await apiFetch<{ prev_year: { paid: number; unpaid: number }; this_year: { paid: number; unpaid: number } }>(
        route('api.invoices.status-distribution-by-year'),
        {
            method: 'GET',
        },
    );
};
