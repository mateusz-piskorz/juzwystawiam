'use client';

import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';
import { DataTableRowActions } from '@/components/common/data-table/data-table-row-actions';
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
    locale: ReturnType<typeof useLocale>['locale']['dashboard/products'] & {
        common: ReturnType<typeof useLocale>['locale']['common'];
        enum: ReturnType<typeof useLocale>['locale']['enum'];
    };
}): ColumnDef<Product>[] => [
    {
        accessorKey: 'name',
        meta: { title: locale['Product name'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.name,
        enableSorting: false,
    },
    {
        accessorKey: 'measure_unit',
        meta: { title: locale.common['Measure Unit'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => locale['enum']['MEASURE_UNIT'][row.original.measure_unit],
    },
    {
        accessorKey: 'vat_rate',
        meta: { title: locale.common['Vat rate'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => `${row.original.vat_rate}%`,
    },
    {
        accessorKey: 'price',
        meta: { title: locale['Price'] },
        header: ({ column }) => <DataTableColumnHeader column={column} />,
        cell: ({ row }) => row.original.price,
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
