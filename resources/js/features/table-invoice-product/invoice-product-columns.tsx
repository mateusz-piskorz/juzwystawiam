'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { useLocale } from '@/lib/hooks/use-locale';
import { InvoiceProduct } from '@/lib/types/invoice';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

type Props = {
    locale: ReturnType<typeof useLocale>['locale']['dashboard/invoices'] & {
        common: ReturnType<typeof useLocale>['locale']['common'];
        enum: ReturnType<typeof useLocale>['locale']['enum'];
    };
};

export function getInvoiceProductColumns({ locale }: Props): ColumnDef<InvoiceProduct>[] {
    return [
        {
            accessorKey: 'name',
            meta: { title: locale.Name },
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.name,
            enableSorting: false,
        },
        {
            meta: { title: locale.common['Measure Unit'] },
            accessorKey: 'measure_unit',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => locale.enum.MEASURE_UNIT[row.original.measure_unit],
            enableSorting: false,
        },
        {
            meta: { title: locale['Grand Total'] },
            accessorKey: 'grand_total',
            header: ({ column }) => <DataTableColumnHeader column={column} />,
            cell: ({ row }) => row.original.grand_total,
            enableSorting: false,
        },
        {
            meta: { title: locale.Date },
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
