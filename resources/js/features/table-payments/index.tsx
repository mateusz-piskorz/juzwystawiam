import { DashboardHeading } from '@/components/common/dashboard-heading';
import { DataTable } from '@/components/common/data-table';
import { getAllPremiumAccountPayments } from '@/lib/data/premium-account';
import { useLocale } from '@/lib/hooks/use-locale';
import { useQuery } from '@tanstack/react-query';
import { getPaymentsColumns } from './payments-columns';

export const TablePayments = () => {
    const locale = useLocale().locale['dashboard/premium-account']['payments-history'];

    const { data } = useQuery({
        queryKey: ['getAllPremiumAccountPayments'],
        queryFn: getAllPremiumAccountPayments,
    });

    const columns = getPaymentsColumns({ locale });

    return (
        <>
            <DashboardHeading title={locale['Payments History']} />
            <DataTable displayDataTableToolbar={false} data={data ?? []} columns={columns} filters={[]} />
        </>
    );
};
