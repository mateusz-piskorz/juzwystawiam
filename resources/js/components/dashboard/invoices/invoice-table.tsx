import { DataTable } from '@/components/common/data-table';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { getInvoices } from '@/lib/data/invoices';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { invoiceColumns } from './invoice-columns';

type Props = {
    displayDataTableToolbar?: boolean;
    withFilters?: boolean;
    displayPagination?: boolean;
};

export const InvoiceTable = ({ displayDataTableToolbar = true, withFilters = true, displayPagination = true }: Props) => {
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

    return (
        <DataTable
            displayDataTableToolbar={displayDataTableToolbar}
            totalPages={displayPagination ? String(data?.last_page) : undefined}
            data={data?.data ?? []}
            columns={invoiceColumns}
            addNewRecord={{
                label: 'Add new invoice',
                href: '/dashboard/invoices/create',
            }}
            filters={
                withFilters
                    ? [
                          {
                              filterKey: 'is_already_paid',
                              title: 'Is already paid',
                              options: [
                                  { label: 'true', value: 'true' },
                                  { label: 'false', value: 'false' },
                              ],
                          },
                          {
                              filterKey: 'type',
                              title: 'Type',
                              options: Object.values(INVOICE_TYPE).map((e) => ({ label: e, value: e })),
                          },
                      ]
                    : []
            }
        />
    );
};
