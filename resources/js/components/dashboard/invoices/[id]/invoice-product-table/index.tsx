import { DataTable } from '@/components/common/data-table';
import { InvoiceProduct } from '@/lib/types/invoice';
import { InvoiceProductColumns } from './invoice-product-columns';

type Props = {
    data: InvoiceProduct[];
};

export const InvoiceProductTable = ({ data }: Props) => {
    return <DataTable displayDataTableToolbar={false} data={data ?? []} columns={InvoiceProductColumns} filters={[]} />;
};
