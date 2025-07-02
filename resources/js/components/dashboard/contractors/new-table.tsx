import { DataTable } from '@/components/common/data-table';
import { getColumns } from '@/components/common/data-table/columns/columns2';
import { TYPE_OF_BUSINESS } from '@/lib/constants/enums/type-of-business';
import { getContractors } from '@/lib/data/contractors';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';

export const NewTable = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const is_own_company = searchParams.getAll('is_own_company');
    const type_of_business = searchParams.getAll('type_of_business');
    const order_column = searchParams.get('order_column');
    const order_direction = searchParams.get('order_direction') as OrderDirection;

    const { data } = useQuery({
        queryKey: ['contractor-list', searchParams],
        queryFn: () =>
            getContractors({ page, limit: limit ? Number(limit) : 25, is_own_company, type_of_business, order_column, order_direction }).then((e) => {
                return {
                    ...e,
                    data: e.data.map((c) => {
                        return { ...c, company_name: c.company_name ?? c.full_name };
                    }),
                };
            }),
    });

    const columns = getColumns({
        handleDeleteContractor: (id: number) => {
            console.log(id);
        },
        handleEditContractor: (id: number) => {
            console.log(id);
        },
    });

    return (
        <DataTable
            data={data?.data ?? []}
            columns={columns}
            addNewRecord={{
                label: 'Add new contractor',
                action: () => {
                    console.log('new contractor handle');
                },
            }}
            filters={[
                {
                    filterKey: 'is_own_company',
                    title: 'Is own company',
                    options: [
                        { label: 'true', value: 'true' },
                        { label: 'false', value: 'false' },
                    ],
                },
                {
                    filterKey: 'type_of_business',
                    title: 'type of business',
                    options: Object.values(TYPE_OF_BUSINESS).map((e) => ({ label: e, value: e })),
                },
            ]}
        />
    );
};
