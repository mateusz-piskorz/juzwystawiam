import { DataTable } from '@/components/common/data-table';
import { TYPE_OF_BUSINESS } from '@/lib/constants/enums/type-of-business';
import { deleteContractor, getContractors } from '@/lib/data/contractors';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { getContractorColumns } from './contractor-columns';
import { UpsertContractorDialog } from './upsert-contractor-dialog';

export const ContractorTable = () => {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [selectedContractorId, setSelectedContractorId] = useState<number | undefined>(undefined);

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');
    const order_column = searchParams.get('order_column');
    const order_direction = searchParams.get('order_direction') as OrderDirection;
    const is_own_company = searchParams.getAll('is_own_company');
    const type_of_business = searchParams.getAll('type_of_business');

    const { data, refetch } = useQuery({
        queryKey: ['contractor-list', page, limit, q, order_column, order_direction, is_own_company, type_of_business],
        queryFn: () => getContractors({ page, limit, q, order_column, order_direction, is_own_company, type_of_business }),
    });

    const columns = getContractorColumns({
        handleDeleteContractor: async (contractorId: number) => {
            try {
                await deleteContractor({ contractorId });
                toast.success('Contractor deleted successfully');
                refetch();
                setOpen(false);
            } catch (err) {
                toast.error(typeof err === 'string' ? err : 'Something went wrong');
            }
        },
        handleEditContractor: (contractorId: number) => {
            const contractor = data?.data.find((p) => p.id === contractorId);
            if (!contractor) return;

            setSelectedContractorId(contractorId);
            setOpen(true);
        },
    });

    return (
        <>
            <UpsertContractorDialog
                open={open}
                onSuccess={() => refetch()}
                setOpen={setOpen}
                defaultValues={data?.data.find((e) => e.id === selectedContractorId)}
                contractorId={selectedContractorId}
            />

            <DataTable
                totalPages={String(data?.last_page)}
                data={data?.data ?? []}
                columns={columns}
                addNewRecord={{
                    label: 'Add new contractor',
                    action: () => {
                        setSelectedContractorId(undefined);
                        setOpen(true);
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
                        title: 'Type of business',
                        options: Object.values(TYPE_OF_BUSINESS).map((e) => ({ label: e, value: e })),
                    },
                ]}
            />
        </>
    );
};
