'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocale } from '@/lib/hooks/use-locale';
import { PremiumAccountPayment } from '@/lib/types/premium-account-payments';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

type Props = {
    locale: ReturnType<typeof useLocale>['locale']['dashboard/premium-account']['payments-history'];
};

export function getPaymentsColumns({ locale }: Props): ColumnDef<PremiumAccountPayment>[] {
    return [
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
                title: locale.Amount,
            },
            accessorKey: 'amount',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => `${(row.original.amount / 100).toFixed(2)} PLN`,
            enableSorting: false,
        },
        {
            meta: {
                title: locale.Status,
            },
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.status,
            enableSorting: false,
        },
        {
            meta: {
                title: locale.Description,
            },
            accessorKey: 'description',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.description ?? row.original.id,
            enableSorting: false,
        },
        {
            meta: {
                title: locale.Date,
            },
            accessorKey: 'created',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                const formattedDate = dayjs(row.original.created * 1000).format('DD-MM-YYYY');
                return formattedDate;
            },
            enableSorting: false,
        },
        {
            id: 'actions',
            cell: () => <DataTableRowActions actions={[]} />,
        },
    ];
}
