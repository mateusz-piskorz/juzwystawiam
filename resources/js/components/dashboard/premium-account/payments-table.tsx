import { DataTable } from '@/components/common/data-table';
import { getAllPremiumAccountPayments } from '@/lib/data/premium-account';
import { useQuery } from '@tanstack/react-query';
import { paymentsColumns } from './payments-columns';

export const PaymentsTable = () => {
    const { data } = useQuery({
        queryKey: ['getAllPremiumAccountPayments'],
        queryFn: getAllPremiumAccountPayments,
    });

    return <DataTable displayDataTableToolbar={false} data={data ?? []} columns={paymentsColumns} filters={[]} />;
};
