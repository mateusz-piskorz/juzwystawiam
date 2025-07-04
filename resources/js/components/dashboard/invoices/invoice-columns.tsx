'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Invoice } from '@/lib/types/invoice';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const invoiceColumns: ColumnDef<Invoice>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Number" />,
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">{row.original.number}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{String(row.original.type)}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'sale_date',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sale date" />,
        cell: ({ row }) => {
            const formattedDate = dayjs(row.original.sale_date).format('DD-MM-YYYY');

            return (
                <div className="flex w-[100px] items-center">
                    <span>{formattedDate}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'total',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{row.original.total}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'is_already_paid',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Is already paid" />,
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span>{String(row.original.is_already_paid)}</span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions actions={[{ label: 'show', action: () => router.get(`/dashboard/invoices/${row.original.id}`) }]} />,
    },
];
