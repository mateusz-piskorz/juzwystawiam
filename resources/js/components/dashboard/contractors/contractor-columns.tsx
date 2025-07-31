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
    locale: ReturnType<typeof useLocale>['locale']['dashboard/contractors'] & {
        common: ReturnType<typeof useLocale>['locale']['common'];
        enum: ReturnType<typeof useLocale>['locale']['enum'];
    };
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
        meta: { title: locale['Company name'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.company_name,
        enableSorting: false,
    },
    {
        accessorKey: 'is_own_company',
        meta: { title: locale['Is own company'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => (row.original.is_own_company ? locale.common.true : locale.common.false),
    },
    {
        meta: {
            title: locale['Type of business'],
        },
        accessorKey: 'type_of_business',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => locale.enum.TYPE_OF_BUSINESS[row.original.type_of_business],
    },
    {
        meta: {
            title: locale.Country,
        },
        accessorKey: 'country',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.country,
        enableSorting: false,
    },
    {
        meta: {
            title: locale.Address,
        },
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => `${row.original.postal_code} ${row.original.city}`,
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
