import { DashboardHeading } from '@/components/common/dashboard-heading';
import { DataTable } from '@/components/common/data-table';
import { api } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useQuery } from '@tanstack/react-query';
import { getPaymentsColumns } from './payments-columns';

export const TablePayments = () => {
    const locale = useLocale().locale['dashboard/premium-account']['payments-history'];

    const { data } = useQuery({
        queryKey: ['getAllPremiumAccountPayments'],
        queryFn: api['premium-account.payments'],
    });

    const columns = getPaymentsColumns({ locale });

    return (
        <div className="px-4 md:px-8">
            <DashboardHeading title={locale['Payments History']} />
            <DataTable displayDataTableToolbar={false} data={data ?? []} columns={columns} filters={[]} />
        </div>
    );
};
