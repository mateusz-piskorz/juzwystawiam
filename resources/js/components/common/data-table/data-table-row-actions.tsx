'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from '@/lib/hooks/use-locale';

interface DataTableRowActionsProps {
    actions: { label: string; action: () => void }[];
}

export function DataTableRowActions({ actions }: DataTableRowActionsProps) {
    const locale = useLocale().locale.data.common['data-table'];
    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="data-[state=open]:bg-muted h-8 w-8 p-0">
                        <span className="sr-only">{locale['Open menu']}</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{locale.Actions}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actions.map(({ action, label }) => (
                        <DropdownMenuItem onClick={action}>{label}</DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
