import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deleteProduct, getProducts } from '@/lib/data/products';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';
import { getColumns } from './columns';
import { UpsertProductDialog } from './upsert-product-dialog';

export const ProductsTable = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page');

    const { data, refetch } = useQuery({
        queryKey: ['products-list', page],
        queryFn: () => getProducts({ page, limit: 10 }),
    });

    const [open, setOpen] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct({ productId });
            toast.success(`Product deleted successfully`);
            refetch();
            setOpen(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : 'Something went wrong');
        }
    };

    const handleEditProduct = (productId: number) => {
        const product = data?.data.find((p) => p.id === productId);
        if (!product) return;

        setSelectedProductId(productId);
        setOpen(true);
    };

    const columns = getColumns({
        handleDeleteProduct,
        handleEditProduct,
    });

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handlePageChange = (action: 'prev' | 'next') => {
        if (!data) return;
        searchParams.set('page', String(data.current_page + (action === 'next' ? 1 : -1)));
    };

    return (
        <>
            <UpsertProductDialog
                open={open}
                onSuccess={() => refetch()}
                setOpen={setOpen}
                defaultValues={data?.data.find((e) => e.id === selectedProductId)}
                productId={selectedProductId}
            />

            <div className="flex items-center justify-between gap-4 pt-4 pb-6">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <div>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto cursor-pointer">
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        className="cursor-pointer"
                        onClick={() => {
                            setSelectedProductId(undefined);
                            setOpen(true);
                        }}
                        variant="secondary"
                    >
                        Create
                    </Button>
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                    )}
                </div>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
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
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => handlePageChange('prev')} disabled={!data?.prev_page_url}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePageChange('next')} disabled={!data?.next_page_url}>
                    Next
                </Button>
            </div>
        </>
    );
};
