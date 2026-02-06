'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

export const getExpenseColumns = ({
    handleEditExpense,
    handleDeleteExpense,
    locale,
}: {
    handleEditExpense: (expenseTypeId: number) => void;
    handleDeleteExpense: (expenseTypeId: number) => void;
    locale: ReturnType<typeof useLocale>['locale']['dashboard/expenses'] & {
        common: ReturnType<typeof useLocale>['locale']['common'];
        enum: ReturnType<typeof useLocale>['locale']['enum'];
    };
}): ColumnDef<z.infer<typeof schemas.ExpenseResource>>[] => [
    {
        accessorKey: 'title',
        meta: { title: locale['Expense title'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.title,
        enableSorting: false,
    },
    {
        accessorKey: 'expense_type_id',
        meta: { title: locale['Expense type'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.expense_type?.name,
        enableSorting: false,
    },
    {
        accessorKey: 'total',
        meta: { title: locale['Expense total'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.total,
        enableSorting: false,
    },
    {
        accessorKey: 'description',
        meta: { title: locale['Expense total'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.description,
        enableSorting: false,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                actions={[
                    { label: locale['Delete expense'], action: () => handleDeleteExpense(row.original.id) },
                    { label: locale['Edit expense'], action: () => handleEditExpense(row.original.id) },
                ]}
            />
        ),
    },
];
