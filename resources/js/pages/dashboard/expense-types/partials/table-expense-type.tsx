import ConfirmDialog from '@/components/common/confirm-dialog';
import { DataTable } from '@/components/common/data-table';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { getExpenseTypeColumns } from './expense-type-columns';
import { UpsertExpenseTypeDialog } from './upsert-expense-type-dialog';

export const TableExpenseType = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expense-types'], common: l.common, enum: l.enum };

    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedExpenseType, setSelectedExpenseType] = useState<z.infer<typeof schemas.ExpenseTypeResource> | undefined>(undefined);

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');

    const { data, refetch } = useQuery({
        queryKey: ['expense-type-list', page, limit, q],
        queryFn: () =>
            api['expense-types.index']({
                queries: {
                    limit: limit ? Number(limit) : undefined,
                    q,
                    page: page ? Number(page) : undefined,
                },
            }),
    });

    const handleDeleteExpenseType = async (expenseTypeId: number) => {
        try {
            await api['expense-types.destroy'](undefined, { params: { expenseType: expenseTypeId } });
            toast.success(locale['Expense Type deleted successfully']);
            refetch();
            setOpenConfirm(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : locale.common['something went wrong']);
        }
    };

    const columns = getExpenseTypeColumns({
        handleDeleteExpenseType: (expenseTypeId: number) => {
            const selectedExpense = data?.data.find((e) => e.id === expenseTypeId);
            if (!selectedExpense) return;
            setSelectedExpenseType(selectedExpense);
            setOpenConfirm(true);
        },
        handleEditExpenseType: async (expenseTypeId: number) => {
            const selectedExpense = data?.data.find((p) => p.id === expenseTypeId);
            if (!selectedExpense) return;
            setSelectedExpenseType(selectedExpense);
            setOpen(true);
        },
        locale,
    });

    return (
        <>
            <UpsertExpenseTypeDialog open={open} onSuccess={() => refetch()} setOpen={setOpen} expenseType={selectedExpenseType} />

            <ConfirmDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                onContinue={async () => {
                    if (selectedExpenseType) {
                        await handleDeleteExpenseType(selectedExpenseType.id);
                    }
                }}
                title={`${locale['Are you sure you want to remove this expense type']}?`}
                description={locale['This action cannot be undone. Expense Type will be permanently deleted']}
            />

            <DataTable
                totalPages={data?.meta.last_page}
                data={data?.data ?? []}
                columns={columns}
                addNewRecord={{
                    label: locale['Add new expense type'],
                    action: () => {
                        setSelectedExpenseType(undefined);
                        setOpen(true);
                    },
                }}
                filters={[]}
            />
        </>
    );
};
