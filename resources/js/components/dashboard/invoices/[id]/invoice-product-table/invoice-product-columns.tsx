'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { InvoiceProduct } from '@/lib/types/invoice';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const InvoiceProductColumns: ColumnDef<InvoiceProduct>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => row.original.name,
        enableSorting: false,
    },
    {
        accessorKey: 'measure_unit',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Measure Unit" />,
        cell: ({ row }) => row.original.measure_unit,
        enableSorting: false,
    },
    {
        accessorKey: 'grand_total',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Grand Total" />,
        cell: ({ row }) => row.original.grand_total,
        enableSorting: false,
    },
    {
        accessorKey: 'created',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
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
