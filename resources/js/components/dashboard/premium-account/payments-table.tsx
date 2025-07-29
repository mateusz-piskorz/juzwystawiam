import { DataTable } from '@/components/common/data-table';
import { Heading } from '@/components/common/heading';
import { getAllPremiumAccountPayments } from '@/lib/data/premium-account';
import { useLocale } from '@/lib/hooks/use-locale';
import { useQuery } from '@tanstack/react-query';
import { getPaymentsColumns } from './payments-columns';

export const PaymentsTable = () => {
    const locale = useLocale().locale['dashboard/premium-account']['payments-history'];

    const { data } = useQuery({
        queryKey: ['getAllPremiumAccountPayments'],
        queryFn: getAllPremiumAccountPayments,
    });

    const columns = getPaymentsColumns({ locale });

    return (
        <>
            <Heading title={locale['Payments History']} />
            <DataTable displayDataTableToolbar={false} data={data ?? []} columns={columns} filters={[]} />;
        </>
    );
};
