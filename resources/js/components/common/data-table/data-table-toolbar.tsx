'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { Table } from '@tanstack/react-table';
import { debounce } from 'lodash';
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
    const q = searchParams.get('q');

    return (
        <div className="flex flex-col items-center justify-between gap-4 overflow-x-auto pb-4 md:flex-row">
            <Input
                placeholder="Search..."
                onChange={debounce((event) => searchParams.set({ q: event.target.value || undefined }), 500)}
                defaultValue={q}
                className="min-w-[150px] rounded md:max-w-xs"
            />
            <div className="mr-auto flex items-center">
                {filters.map((e) => (
                    <DataTableFilter title={e.title} options={e.options} filterKey={e.filterKey} />
                ))}

                {searchParams.has(filters.map((e) => e.filterKey)) && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            searchParams.clear(filters.map((e) => e.filterKey));
                        }}
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>

            <div className="flex w-full items-center gap-2 md:w-auto">
                <DataTableViewOptions table={table} />
                {addNewRecord && (
                    <Button variant="secondary" className="rounded" onClick={addNewRecord.action}>
                        {addNewRecord.label}
                    </Button>
                )}
            </div>
        </div>
    );
}
