import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePage } from '@/lib/hooks/use-page';
import { apiFetch } from '@/lib/utils/api-fetch';
import { Contractor, Pagination, SharedData } from '@/types';
import { router } from '@inertiajs/react';
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
import { ComponentProps, useState } from 'react';
import { toast } from 'sonner';
import { getColumns } from './columns';
import { UpsertInvoiceDialog } from './upsert-invoice-dialog';

export const InvoicesTable = () => {
    const {
        props: { invoices, ziggy },
    } = usePage<{ invoices: Pagination<Contractor> }>();

    const { data, refetch } = useQuery<Pagination<Contractor>>({
        queryKey: ['invoice-list', ziggy],
        queryFn: () => apiFetch(`/api/invoices?${new URLSearchParams(ziggy.query).toString()}`).then((res) => res.json()),
        initialData: invoices,
    });

    const [open, setOpen] = useState(false);
    const [defaultValues, setDefaultValues] = useState<ComponentProps<typeof UpsertInvoiceDialog>['defaultValues'] | undefined>(undefined);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const handleDeleteContractor = async (invoiceId: string) => {
        const res = await apiFetch(`/api/contractors/${invoiceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            toast.success(`Contractor deleted successfully`);
            refetch();
            setOpen(false);
        } else {
            toast.error('Something went wrong');
        }
    };

    const handleEditContractor = (invoiceId: string) => {
        const contractor = data?.data.find((p: Contractor) => p.id === invoiceId);
        if (!contractor) return;
        setDefaultValues({
            name: contractor.name,
            nip: contractor.nip,
            is_own_company: contractor.is_own_company,
        });

        setSelectedInvoiceId(invoiceId);
        setOpen(true);
    };

    const columns = getColumns({
        handleDeleteContractor,
        handleEditContractor,
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
        const params = new URLSearchParams(ziggy.query);
        params.set('page', String(data.current_page + (action === 'next' ? 1 : -1)));
        router.replace({
            url: `${ziggy.location}?${params.toString()}`,
            props: (currentProps: SharedData): SharedData => {
                return { ...currentProps, ziggy: { ...ziggy, query: Object.fromEntries(params.entries()) } };
            },
        });
    };

    return (
        <>
            <UpsertInvoiceDialog open={open} refetch={refetch} setOpen={setOpen} defaultValues={defaultValues} invoiceId={selectedInvoiceId} />

            <div className="rounded-md border">
                <div className="flex items-center gap-4 p-4">
                    <Input
                        placeholder="Filter number..."
                        value={(table.getColumn('number')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('number')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />

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

                    <Button className="cursor-pointer" onClick={() => setOpen(true)} variant="secondary">
                        Create
                    </Button>
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                    )}
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
                    <Button variant="outline" size="sm" onClick={() => handlePageChange('prev')} disabled={!data.prev_page_url}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handlePageChange('next')} disabled={!data.next_page_url}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};
