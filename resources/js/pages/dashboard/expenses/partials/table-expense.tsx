import ConfirmDialog from '@/components/common/confirm-dialog';
import { DataTable } from '@/components/common/data-table';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { getExpenseColumns } from './expense-columns';
import { UpsertExpenseDialog } from './upsert-expense-dialog';

export const TableExpense = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expenses'], common: l.common, enum: l.enum };

    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<z.infer<typeof schemas.ExpenseResource> | undefined>(undefined);

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');

    const { data, refetch } = useQuery({
        queryKey: ['expense-list', page, limit, q],
        queryFn: () =>
            api['expenses.index']({
                queries: {
                    limit: limit ? Number(limit) : undefined,
                    q,
                    page: page ? Number(page) : undefined,
                },
            }),
    });

    const handleDeleteExpense = async (expenseId: number) => {
        try {
            await api['expenses.destroy'](undefined, { params: { expense: expenseId } });
            toast.success(locale['Expense deleted successfully']);
            refetch();
            setOpenConfirm(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : locale.common['something went wrong']);
        }
    };

    const columns = getExpenseColumns({
        handleDeleteExpense: (expenseTypeId: number) => {
            const selectedExpense = data?.data.find((e) => e.id === expenseTypeId);
            if (!selectedExpense) return;
            setSelectedExpense(selectedExpense);
            setOpenConfirm(true);
        },
        handleEditExpense: async (expenseTypeId: number) => {
            const selectedExpense = data?.data.find((p) => p.id === expenseTypeId);
            if (!selectedExpense) return;
            setSelectedExpense(selectedExpense);
            setOpen(true);
        },
        locale,
    });

    return (
        <>
            <UpsertExpenseDialog open={open} onSuccess={() => refetch()} setOpen={setOpen} expense={selectedExpense} />

            <ConfirmDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                onContinue={async () => {
                    if (selectedExpense) {
                        await handleDeleteExpense(selectedExpense.id);
                    }
                }}
                title={`${locale['Are you sure you want to remove this expense']}?`}
                description={locale['This action cannot be undone. Expense will be permanently deleted']}
            />

            <DataTable
                totalPages={data?.meta.last_page}
                data={data?.data ?? []}
                columns={columns}
                addNewRecord={{
                    label: locale['Add new expense'],
                    action: () => {
                        setSelectedExpense(undefined);
                        setOpen(true);
                    },
                }}
                filters={[]}
            />
        </>
    );
};
