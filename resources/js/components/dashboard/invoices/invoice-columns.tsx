'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocale } from '@/lib/hooks/use-locale';
import { Invoice } from '@/lib/types/invoice';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

type Props = {
    locale: ReturnType<typeof useLocale>['locale']['dashboard/invoices'];
};

export function getInvoiceColumns({ locale }: Props): ColumnDef<Invoice>[] {
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
            accessorKey: 'number',
            meta: { title: locale.Number },
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                return row.original.number;
            },
        },
        {
            accessorKey: 'type',
            meta: { title: locale.Type },
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                return String(row.original.type);
            },
        },
        {
            accessorKey: 'sale_date',
            meta: { title: locale['Sale Date'] },
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                const formattedDate = dayjs(row.original.sale_date).format('DD-MM-YYYY');
                return formattedDate;
            },
        },
        {
            accessorKey: 'total',
            meta: { title: locale.Total },
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                return row.original.total;
            },
        },
        {
            meta: { title: locale['Is already paid'] },
            accessorKey: 'is_already_paid',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                return String(row.original.is_already_paid);
            },
        },
        {
            meta: { title: locale['Email status'] },
            accessorKey: 'latest_invoice_email.status',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                return row.original.latest_invoice_email?.status;
            },
            enableSorting: false,
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableRowActions
                    actions={[
                        {
                            label: locale.Show,
                            action: () => router.get(`/dashboard/invoices/${row.original.id}`),
                        },
                    ]}
                />
            ),
        },
    ];
}
