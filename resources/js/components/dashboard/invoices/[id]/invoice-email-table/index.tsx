import { DataTable } from '@/components/common/data-table';
import { useLocale } from '@/lib/hooks/use-locale';
import { InvoiceEmail } from '@/lib/types/invoice';
import { getInvoiceEmailColumns } from './invoice-email-columns';

type Props = {
    data: InvoiceEmail[];
};

export const InvoiceEmailTable = ({ data }: Props) => {
    const locale = useLocale().locale.data['dashboard/invoices'];
    const columns = getInvoiceEmailColumns({ locale });
    return <DataTable displayDataTableToolbar={false} data={data ?? []} columns={columns} filters={[]} />;
};
