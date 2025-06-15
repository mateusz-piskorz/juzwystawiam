import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Contractor } from '@/lib/types/index';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const getColumns = ({
    handleEditContractor,
    handleDeleteContractor,
}: {
    handleEditContractor: (contractorId: number) => void;
    handleDeleteContractor: (contractorId: number) => void;
}): ColumnDef<Contractor>[] => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'nip',
        header: 'Nip',
    },
    {
        accessorKey: 'city',
        header: 'city',
    },
    {
        accessorKey: 'postal_code',
        header: 'postal_code',
    },
    {
        accessorKey: 'street_name',
        header: 'street_name',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const contractor = row.original;

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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(contractor.id))}>
                                Copy contractor ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditContractor(contractor.id)}>Edit Contractor</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteContractor(contractor.id)}>Delete Contractor</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                className="cursor-pointer"
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="cursor-pointer"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
];
