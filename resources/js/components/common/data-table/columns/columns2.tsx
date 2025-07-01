'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { Contractor } from '@/lib/types/contractor';
import { DataTableColumnHeader } from '../data-table-column-header';
import { DataTableRowActions } from '../data-table-row-actions';

// todo: fix sorting

export const getColumns = ({
    handleDeleteContractor,
    handleEditContractor,
}: {
    handleEditContractor: (contractorId: number) => void;
    handleDeleteContractor: (contractorId: number) => void;
}): ColumnDef<Contractor>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Contractor id" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'company_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.original.company_name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'is_own_company',
        header: ({ column }) => <DataTableColumnHeader column={column} title="is own company" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{String(row.original.is_own_company)}</span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                actions={[
                    { label: 'delete', action: () => handleDeleteContractor(row.original.id) },
                    { label: 'edit', action: () => handleEditContractor(row.original.id) },
                ]}
            />
        ),
    },
];
