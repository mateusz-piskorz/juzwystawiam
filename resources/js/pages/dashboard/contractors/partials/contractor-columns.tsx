import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

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
}): ColumnDef<z.infer<typeof schemas.ContractorResource>>[] => [
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
