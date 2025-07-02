import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSearchParams } from '@/lib/hooks/use-search-params';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
    const searchParams = useSearchParams();
    const orderColumn = searchParams.get('order_column');
    const orderDirection = searchParams.get('order_direction');

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    const handleSortChange = (option: 'asc' | 'desc') => {
        searchParams.set({ order_column: column.id, order_direction: option });
    };

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
                        <span>{title}</span>
                        {orderColumn === column.id ? orderDirection === 'desc' ? <ArrowDown /> : <ArrowUp /> : <ChevronsUpDown />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleSortChange('asc')}>
                        <ArrowUp className="text-muted-foreground/70 h-3.5 w-3.5" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('desc')}>
                        <ArrowDown className="text-muted-foreground/70 h-3.5 w-3.5" />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeOff className="text-muted-foreground/70 h-3.5 w-3.5" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
