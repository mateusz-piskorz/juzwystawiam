'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocale } from '@/lib/hooks/use-locale';
import { Contractor } from '@/lib/types/contractor';
import { ColumnDef } from '@tanstack/react-table';

export const getContractorColumns = ({
    handleEditContractor,
    handleDeleteContractor,
    locale,
}: {
    handleEditContractor: (contractorId: number) => void;
    handleDeleteContractor: (contractorId: number) => void;
    locale: ReturnType<typeof useLocale>['locale']['dashboard/contractors'];
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
        meta: {
            title: locale['Company name'],
        },
        accessorKey: 'company_name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return row.original.company_name;
        },
        enableSorting: false,
    },
    {
        meta: {
            title: locale['Is own company'],
        },
        accessorKey: 'is_own_company',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return String(row.original.is_own_company);
        },
    },
    {
        meta: {
            title: locale['Type of business'],
        },
        accessorKey: 'type_of_business',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return row.original.type_of_business;
        },
    },
    {
        meta: {
            title: locale.Country,
        },
        accessorKey: 'country',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return row.original.country;
        },
        enableSorting: false,
    },
    {
        meta: {
            title: locale.Address,
        },
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return `${row.original.postal_code} ${row.original.city}`;
        },
        enableSorting: false,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                actions={[
                    { label: locale['Delete contractor'], action: () => handleDeleteContractor(row.original.id) },
                    { label: locale['Edit contractor'], action: () => handleEditContractor(row.original.id) },
                ]}
            />
        ),
    },
];
