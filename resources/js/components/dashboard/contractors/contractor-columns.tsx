'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Contractor } from '@/lib/types/contractor';
import { ColumnDef } from '@tanstack/react-table';

export const getContractorColumns = ({
    handleEditContractor,
    handleDeleteContractor,
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
        accessorKey: 'company_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.original.company_name}</span>
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: 'is_own_company',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Is own company" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{String(row.original.is_own_company)}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'type_of_business',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type of business" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{row.original.type_of_business}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'country',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{row.original.country}</span>
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>
                        {row.original.postal_code} {row.original.city}
                    </span>
                </div>
            );
        },
        enableSorting: false,
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
