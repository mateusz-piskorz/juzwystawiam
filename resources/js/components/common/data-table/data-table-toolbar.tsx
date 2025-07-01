'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { ComponentProps } from 'react';
import { DataTableFilter } from './data-table-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    addNewRecord?: {
        label: string;
        action: () => void;
    };
    filters: ComponentProps<typeof DataTableFilter>[];
}

export function DataTableToolbar<TData>({ table, addNewRecord, filters }: DataTableToolbarProps<TData>) {
    const searchParams = useSearchParams();

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {filters.map((e) => (
                    <DataTableFilter title={e.title} options={e.options} filterKey={e.filterKey} />
                ))}

                {searchParams.has(filters.map((e) => e.filterKey)) && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            searchParams.set(
                                filters.map((e) => e.filterKey),
                                null,
                            );
                        }}
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <DataTableViewOptions table={table} />
                {addNewRecord && (
                    <Button size="sm" onClick={addNewRecord.action}>
                        {addNewRecord.label}
                    </Button>
                )}
            </div>
        </div>
    );
}
