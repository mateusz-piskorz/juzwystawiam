'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { InvoiceEmail } from '@/lib/types/invoice';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const InvoiceEmailColumns: ColumnDef<InvoiceEmail>[] = [
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
        accessorKey: 'recipient',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Recipient" />,
        cell: ({ row }) => row.original.recipient,
        enableSorting: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => row.original.status,
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
