import { DataTable } from '@/components/common/data-table';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { getInvoices } from '@/lib/data/invoices';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { invoiceColumns } from './invoice-columns';

export const InvoicesTable = () => {
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
        queryFn: () => getInvoices({ page, limit, q, order_column, order_direction, type, is_already_paid }),
    });

    return (
        <DataTable
            totalPages={String(data?.last_page)}
            data={data?.data ?? []}
            columns={invoiceColumns}
            addNewRecord={{
                label: 'Add new invoice',
                href: '/dashboard/invoices/create',
            }}
            filters={[
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
            ]}
        />
    );
};
