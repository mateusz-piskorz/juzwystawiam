'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/lib/types/product';
import { ColumnDef } from '@tanstack/react-table';

export const getProductColumns = ({
    handleEditProduct,
    handleDeleteProduct,
}: {
    handleEditProduct: (productId: number) => void;
    handleDeleteProduct: (productId: number) => void;
}): ColumnDef<Product>[] => [
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
        cell: ({ row }) => {
            return row.original.name;
        },
        enableSorting: false,
    },
    {
        accessorKey: 'measure_unit',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Measure unit" />,
        cell: ({ row }) => {
            return String(row.original.measure_unit);
        },
    },
    {
        accessorKey: 'vat_rate',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Vat rate" />,
        cell: ({ row }) => {
            return row.original.vat_rate;
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => {
            return row.original.price;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                actions={[
                    { label: 'delete', action: () => handleDeleteProduct(row.original.id) },
                    { label: 'edit', action: () => handleEditProduct(row.original.id) },
                ]}
            />
        ),
    },
];
