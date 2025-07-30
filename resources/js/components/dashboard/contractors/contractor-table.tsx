import ConfirmDialog from '@/components/common/confirm-dialog';
import { DataTable } from '@/components/common/data-table';
import { TYPE_OF_BUSINESS } from '@/lib/constants/enums/type-of-business';
import { deleteContractor, getContractors } from '@/lib/data/contractors';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { getContractorColumns } from './contractor-columns';
import { UpsertContractorDialog } from './upsert-contractor-dialog';

export const ContractorTable = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/contractors'], common: l.common, enums: l.enum };

    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
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

    const handleDeleteContractor = async (contractorId: number) => {
        try {
            await deleteContractor({ contractorId });
            toast.success(locale['Contractor deleted successfully']);
            refetch();
            setOpenConfirm(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : locale.common['something went wrong']);
        }
    };

    const columns = getContractorColumns({
        handleDeleteContractor: (contractorId: number) => {
            setSelectedContractorId(contractorId);
            setOpenConfirm(true);
        },
        handleEditContractor: (contractorId: number) => {
            const contractor = data?.data.find((p) => p.id === contractorId);
            if (!contractor) return;

            setSelectedContractorId(contractorId);
            setOpen(true);
        },
        locale,
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

            <ConfirmDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                onContinue={async () => {
                    if (selectedContractorId) {
                        await handleDeleteContractor(selectedContractorId);
                    }
                }}
                title={`${locale['Are you sure you want to remove this Contractor']}?`}
                description={locale['This action cannot be undone. Contractor will be permanently deleted.']}
            />

            <DataTable
                totalPages={String(data?.last_page)}
                data={data?.data ?? []}
                columns={columns}
                addNewRecord={{
                    label: locale['Add new contractor'],
                    action: () => {
                        setSelectedContractorId(undefined);
                        setOpen(true);
                    },
                }}
                filters={[
                    {
                        filterKey: 'is_own_company',
                        title: locale['Is own company'],
                        options: [
                            { label: locale.common.True, value: 'true' },
                            { label: locale.common.False, value: 'false' },
                        ],
                    },
                    {
                        filterKey: 'type_of_business',
                        title: locale['Type of business'],
                        options: Object.values(TYPE_OF_BUSINESS).map((val) => ({ label: locale.enums.TYPE_OF_BUSINESS[val], value: val })),
                    },
                ]}
            />
        </>
    );
};
