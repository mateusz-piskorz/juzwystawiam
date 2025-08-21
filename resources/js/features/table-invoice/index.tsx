/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from '@/components/common/data-table';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { getInvoiceColumns } from './columns-invoice';

type Props = {
    displayDataTableToolbar?: boolean;
    withFilters?: boolean;
    displayPagination?: boolean;
    displaySearchBar?: boolean;
    displayEmailStatusColumn?: boolean;
};

export const TableInvoice = ({
    displayDataTableToolbar = true,
    withFilters = true,
    displayPagination = true,
    displaySearchBar = true,
    displayEmailStatusColumn = true,
}: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common, enum: l.enum };
    const searchParams = useSearchParams();

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');
    const order_column = searchParams.get('order_column');
    const order_direction = searchParams.get('order_direction') as z.infer<typeof schemas.sort_direction>;
    const type = searchParams.getAll('type');
    const is_already_paid = searchParams.getAll('is_already_paid');

    const { data } = useQuery({
        queryKey: ['invoice-list', page, limit, q, order_column, order_direction, type, is_already_paid],
        queryFn: () =>
            api['invoices.index']({
                queries: withFilters
                    ? {
                          page: page ? Number(page) : undefined,
                          limit: limit ? Number(limit) : undefined,
                          q,
                          sort: order_column as any,
                          sort_direction: order_direction,
                          type,
                          is_already_paid,
                      }
                    : { limit: 20 },
            }),
    });

    const columns = getInvoiceColumns({ locale, displayEmailStatusColumn });

    return (
        <DataTable
            displaySearchBar={displaySearchBar}
            displayDataTableToolbar={displayDataTableToolbar}
            totalPages={displayPagination ? data?.meta.last_page : undefined}
            data={data?.data ?? []}
            columns={columns}
            addNewRecord={{
                label: locale['Add new invoice'],
                href: route('invoices.create'),
            }}
            filters={
                withFilters
                    ? [
                          {
                              filterKey: 'is_already_paid',
                              title: locale['Is already paid'],
                              options: [
                                  { label: locale.common.true, value: 'true' },
                                  { label: locale.common.false, value: 'false' },
                              ],
                          },
                          {
                              filterKey: 'type',
                              title: locale.Type,
                              options: schemas.InvoiceType.options.map((e) => ({ label: locale.enum.INVOICE_TYPE[e], value: e })),
                          },
                      ]
                    : []
            }
        />
    );
};
