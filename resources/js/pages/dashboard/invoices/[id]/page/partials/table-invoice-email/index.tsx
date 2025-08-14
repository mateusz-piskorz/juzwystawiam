import { DataTable } from '@/components/common/data-table';
import { useLocale } from '@/lib/hooks/use-locale';
import { InvoiceEmail } from '@/lib/types/invoice';
import { getInvoiceEmailColumns } from './invoice-email-columns';

type Props = {
    data: InvoiceEmail[];
};

export const TableInvoiceEmail = ({ data }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], enum: l.enum };
    const columns = getInvoiceEmailColumns({ locale });
    return <DataTable data={data ?? []} columns={columns} filters={[]} />;
};
