'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocale } from '@/lib/hooks/use-locale';
import { InvoiceProduct } from '@/lib/types/invoice';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

type Props = {
    locale: ReturnType<typeof useLocale>['locale']['data']['dashboard/invoices'];
};

export function getInvoiceProductColumns({ locale }: Props): ColumnDef<InvoiceProduct>[] {
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
            accessorKey: 'name',
            meta: {
                title: locale.Name,
            },
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.name,
            enableSorting: false,
        },
        {
            meta: {
                title: locale['Measure Unit'],
            },
            accessorKey: 'measure_unit',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.measure_unit,
            enableSorting: false,
        },
        {
            meta: {
                title: locale['Grand Total'],
            },
            accessorKey: 'grand_total',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.grand_total,
            enableSorting: false,
        },
        {
            meta: {
                title: locale.Date,
            },
            accessorKey: 'created',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => {
                const formattedDate = dayjs(row.original.created_at).format('DD-MM-YYYY');
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
