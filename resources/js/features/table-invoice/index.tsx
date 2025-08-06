import { DataTable } from '@/components/common/data-table';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { getInvoices } from '@/lib/data/invoices';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { getInvoiceColumns } from './columns-invoice';

type Props = {
    displayDataTableToolbar?: boolean;
    withFilters?: boolean;
    displayPagination?: boolean;
};

export const TableInvoice = ({ displayDataTableToolbar = true, withFilters = true, displayPagination = true }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common, enum: l.enum };
    const searchParams = useSearchParams();

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');
    const order_column = searchParams.get('order_column');
    const order_direction = searchParams.get('order_direction') as OrderDirection;
    const type = searchParams.getAll('type');
    const is_already_paid = searchParams.getAll('is_already_paid');

    const { data } = useQuery({
        queryKey: ['invoice-list', page, limit, q, order_column, order_direction, type, is_already_paid],
        queryFn: () => getInvoices(withFilters ? { page, limit, q, order_column, order_direction, type, is_already_paid } : { limit: '20' }),
    });

    const columns = getInvoiceColumns({ locale });

    return (
        <DataTable
            displayDataTableToolbar={displayDataTableToolbar}
            totalPages={displayPagination ? String(data?.last_page) : undefined}
            data={data?.data ?? []}
            columns={columns}
            addNewRecord={{
                label: locale['Add new invoice'],
                href: '/dashboard/invoices/create',
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
                              options: Object.values(INVOICE_TYPE).map((e) => ({ label: locale.enum.INVOICE_TYPE[e], value: e })),
                          },
                      ]
                    : []
            }
        />
    );
};
