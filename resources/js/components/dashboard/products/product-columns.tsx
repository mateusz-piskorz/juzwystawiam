'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocale } from '@/lib/hooks/use-locale';
import { Product } from '@/lib/types/product';
import { ColumnDef } from '@tanstack/react-table';

export const getProductColumns = ({
    handleEditProduct,
    handleDeleteProduct,
    locale,
}: {
    handleEditProduct: (productId: number) => void;
    handleDeleteProduct: (productId: number) => void;
    locale: ReturnType<typeof useLocale>['locale']['dashboard/products'] & { common: ReturnType<typeof useLocale>['locale']['common'] };
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
        meta: {
            title: locale['Product name'],
        },
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return row.original.name;
        },
        enableSorting: false,
    },
    {
        meta: {
            title: locale.common['Measure Unit'],
        },
        accessorKey: 'measure_unit',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return String(row.original.measure_unit);
        },
    },
    {
        meta: {
            title: locale.common['Vat rate'],
        },
        accessorKey: 'vat_rate',
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => {
            return row.original.vat_rate;
        },
    },
    {
        meta: {
            title: locale['Price'],
        },
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
                    { label: locale['Delete product'], action: () => handleDeleteProduct(row.original.id) },
                    { label: locale['Edit product'], action: () => handleEditProduct(row.original.id) },
                ]}
            />
        ),
    },
];
