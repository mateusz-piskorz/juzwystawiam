import { Button } from '@/components/ui/button';
import { Invoice } from '@/lib/types/invoice';
import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'number',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Number
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'sale_date',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Sale Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const invoice = row.original;

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(invoice.id))}>Copy invoice ID</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(`/dashboard/invoices/${invoice.id}`)}>Show more details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
