/* eslint-disable @typescript-eslint/no-explicit-any */

import ConfirmDialog from '@/components/common/confirm-dialog';
import { DataTable } from '@/components/common/data-table';
import { UpsertContractorDialog } from '@/features/upsert-contractor-dialog';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { getContractorColumns } from './contractor-columns';

export const TableContractor = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/contractors'], common: l.common, enum: l.enum };

    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedContractorId, setSelectedContractorId] = useState<number | undefined>(undefined);

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');
    const order_column = searchParams.get('order_column');
    const order_direction = searchParams.get('order_direction') as z.infer<typeof schemas.sort_direction>;
    const is_own_company = searchParams.getAll('is_own_company');

    const { data, refetch } = useQuery({
        queryKey: ['contractor-list', page, limit, q, order_column, order_direction, is_own_company],
        queryFn: () =>
            api['contractors.index']({
                queries: {
                    page: page ? Number(page) : undefined,
                    limit: limit ? Number(limit) : undefined,
                    q,
                    // todo: any type
                    sort: order_column as any,
                    sort_direction: order_direction,
                    is_own_company,
                },
            }),
    });

    const handleDeleteContractor = async (contractorId: number) => {
        try {
            await api['contractors.destroy'](undefined, { params: { contractor: contractorId } });
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
                totalPages={data?.meta.last_page}
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
                            { label: locale.common.true, value: 'true' },
                            { label: locale.common.false, value: 'false' },
                        ],
                    },
                ]}
            />
        </>
    );
};
