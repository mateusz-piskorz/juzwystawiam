import { DataTable } from '@/components/common/data-table';
// import { columns } from '@/components/common/data-table/columns';
import { getColumns } from '@/components/common/data-table/columns/columns2';
import { getContractors } from '@/lib/data/contractors';
import { useSearchParams } from '@/lib/hooks/use-search-params';

import { useQuery } from '@tanstack/react-query';

const tasks: {
    status: string;
    id: string;
    title: string;
    label: string;
    priority: string;
}[] = [
    { id: '1', label: 'Task1', priority: 'low', status: 'backlog', title: 'title Task1' },
    { id: '2', label: 'Task2', priority: 'medium', status: 'todo', title: 'title Task2' },
    { id: '3', label: 'Task3', priority: 'high', status: 'done', title: 'title Task3' },
];

export const NewTable = () => {
    const searchParams = useSearchParams();
    const [page] = searchParams.get('page');
    // const [status] = searchParams.get('status'); add this to queryKey

    const { data } = useQuery({
        queryKey: ['contractor-list', page],
        queryFn: () =>
            getContractors({ page, limit: 10 }).then((e) => {
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

    return <DataTable data={data?.data ?? []} columns={columns} />;
};
