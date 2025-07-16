import { DataTable } from '@/components/common/data-table';
import { InvoiceEmail } from '@/lib/types/invoice';
import { InvoiceEmailColumns } from './invoice-email-columns';

type Props = {
    data: InvoiceEmail[];
};

export const InvoiceEmailTable = ({ data }: Props) => {
    return <DataTable displayDataTableToolbar={false} data={data ?? []} columns={InvoiceEmailColumns} filters={[]} />;
};
