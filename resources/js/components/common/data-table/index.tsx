/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/utils/cn';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { ComponentProps, useState } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filters: ComponentProps<typeof DataTableToolbar>['filters'];
    addNewRecord?: ComponentProps<typeof DataTableToolbar>['addNewRecord'];
    totalPages?: number;
    displayDataTableToolbar?: boolean;
    className?: string;
    displaySearchBar?: boolean;
}

// todo: layout shift on changing filters (when we need to fetch for data again)
export function DataTable<TData, TValue>({
    columns,
    data,
    filters,
    addNewRecord,
    totalPages,
    displayDataTableToolbar = true,
    displaySearchBar = true,
    className,
}: DataTableProps<TData, TValue>) {
    const locale = useLocale().locale.common['data-table'];

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        //@ts-ignore
        Object.fromEntries(columns.filter((e) => e.meta?.initialVisibility).map(({ accessorKey }) => [accessorKey.replace(/\./g, '_'), false])),
    );

    const table = useReactTable({
        data,
        columns,
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className={cn('bg-card flex flex-col gap-4 rounded-md p-4 shadow', className)}>
            {displayDataTableToolbar && (
                <DataTableToolbar table={table} filters={filters} addNewRecord={addNewRecord} displaySearchBar={displaySearchBar} />
            )}
            <div className="rounded border">
                <Table>
                    <TableHeader className="bg-accent">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={cn(headerGroup.headers[0].id === header.id ? 'pl-6' : '')}
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                cell.getContext().row.getVisibleCells()[0].id === cell.id
                                                    ? 'pl-6'
                                                    : cell.getContext().row.getVisibleCells().slice(-1)[0].id === cell.id
                                                      ? 'pr-6'
                                                      : '',
                                            )}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {locale['No results.']}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} totalPages={totalPages ?? 1} />
        </div>
    );
}
