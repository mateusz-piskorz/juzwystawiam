'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { z } from 'zod';

type Props = {
    locale: ReturnType<typeof useLocale>['locale']['dashboard/premium-account']['payments-history'];
};

export function getPaymentsColumns({ locale }: Props): ColumnDef<z.infer<typeof schemas.StripePaymentIntentResource>>[] {
    return [
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
