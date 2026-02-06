'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

export const getExpenseTypeColumns = ({
    handleEditExpenseType,
    handleDeleteExpenseType,
    locale,
}: {
    handleEditExpenseType: (expenseTypeId: number) => void;
    handleDeleteExpenseType: (expenseTypeId: number) => void;
    locale: ReturnType<typeof useLocale>['locale']['dashboard/expense-types'] & {
        common: ReturnType<typeof useLocale>['locale']['common'];
        enum: ReturnType<typeof useLocale>['locale']['enum'];
    };
}): ColumnDef<z.infer<typeof schemas.ExpenseTypeResource>>[] => [
    {
        accessorKey: 'name',
        meta: { title: locale['Expense Type name'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.name,
        enableSorting: false,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                actions={[
                    { label: locale['Delete expense type'], action: () => handleDeleteExpenseType(row.original.id) },
                    { label: locale['Edit expense type'], action: () => handleEditExpenseType(row.original.id) },
                ]}
            />
        ),
    },
];
