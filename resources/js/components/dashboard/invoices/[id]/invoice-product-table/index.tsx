import { DataTable } from '@/components/common/data-table';
import { useLocale } from '@/lib/hooks/use-locale';
import { InvoiceProduct } from '@/lib/types/invoice';
import { getInvoiceProductColumns } from './invoice-product-columns';

type Props = {
    data: InvoiceProduct[];
};

export const InvoiceProductTable = ({ data }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common };
    const columns = getInvoiceProductColumns({ locale });
    return <DataTable displayDataTableToolbar={false} data={data ?? []} columns={columns} filters={[]} />;
};
