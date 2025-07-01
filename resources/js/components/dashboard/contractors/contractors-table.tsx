import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deleteContractor, getContractors } from '@/lib/data/contractors';
import { usePage } from '@/lib/hooks/use-page';
import { router } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type SortingState, type VisibilityState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { useState } from 'react';
import { toast } from 'sonner';
import { getColumns } from './columns';
import { UpsertContractorDialog } from './upsert-contractor-dialog';

export const ContractorsTable = () => {
    const {
        props: { ziggy },
    } = usePage();

    const [q, setQ] = useState('');
    const { data, refetch } = useQuery({
        queryKey: ['contractor-list', ziggy, q],
        queryFn: () => getContractors({ page: ziggy.query.page, limit: 10, q }),
    });

    const handleSearchChange = debounce((input: string) => {
        setQ(input);
    }, 300);

    const [open, setOpen] = useState(false);

    const [selectedContractorId, setSelectedContractorId] = useState<number | undefined>(undefined);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const handleDeleteContractor = async (contractorId: number) => {
        try {
            await deleteContractor({ contractorId });
            toast.success(`Contractor deleted successfully`);
            refetch();
            setOpen(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : 'Something went wrong');
        }
    };

    const handleEditContractor = (contractorId: number) => {
        const contractor = data?.data.find((p) => p.id === contractorId);
        if (!contractor) return;

        setSelectedContractorId(contractorId);
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
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    });

    const handlePageChange = (action: 'prev' | 'next') => {
        if (!data) return;
        const params = new URLSearchParams(ziggy.query);
        params.set('page', String(data.current_page + (action === 'next' ? 1 : -1)));
        router.replace({
            url: `${ziggy.location}?${params.toString()}`,
            props: (currentProps) => ({ ...currentProps, ziggy: { ...ziggy, query: Object.fromEntries(params.entries()) } }),
        });
    };

    return (
        <>
            <UpsertContractorDialog
                open={open}
                onSuccess={() => refetch()}
                setOpen={setOpen}
                defaultValues={data?.data.find((e) => e.id === selectedContractorId)}
                contractorId={selectedContractorId}
            />

            <div className="flex items-center justify-between gap-4 pt-4 pb-6">
                <Input placeholder="Search ..." defaultValue={q} onChange={(event) => handleSearchChange(event.target.value)} className="max-w-sm" />
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
                            setSelectedContractorId(undefined);
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
