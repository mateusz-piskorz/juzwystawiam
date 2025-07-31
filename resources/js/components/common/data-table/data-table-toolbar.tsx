'use client';

import { MultiOptionsFilter } from '@/components/common/multi-options-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { Link } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { X } from 'lucide-react';
import { ComponentProps } from 'react';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    addNewRecord?:
        | {
              label: string;
              action: () => void;
          }
        | {
              label: string;
              href: string;
          };
    filters: ComponentProps<typeof MultiOptionsFilter>[];
}

export function DataTableToolbar<TData>({ table, addNewRecord, filters }: DataTableToolbarProps<TData>) {
    const locale = useLocale().locale.common['data-table'];
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    return (
        <div className="flex flex-col items-center justify-between gap-4 overflow-x-auto pt-1 pr-1 pb-4 md:flex-row">
            <Input
                placeholder={locale.Search}
                onChange={debounce((event) => searchParams.set({ q: event.target.value || undefined }), 500)}
                defaultValue={q}
                className="min-w-[150px] rounded max-md:h-[50px] md:max-w-xs"
            />
            <div className="mr-auto flex items-center">
                {filters.map((e) => (
                    <MultiOptionsFilter title={e.title} options={e.options} filterKey={e.filterKey} />
                ))}

                {searchParams.has(filters.map((e) => e.filterKey)) && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            searchParams.clear(filters.map((e) => e.filterKey));
                        }}
                    >
                        {locale.Reset}
                        <X />
                    </Button>
                )}
            </div>

            <div className="flex w-full items-center gap-4 md:w-auto">
                <DataTableViewOptions table={table} />
                {addNewRecord && (
                    <>
                        {'href' in addNewRecord ? (
                            <Link prefetch className="ml-2 underline-offset-4 hover:underline" href={addNewRecord.href}>
                                {addNewRecord.label}
                            </Link>
                        ) : (
                            <Button className="rounded" onClick={addNewRecord.action} variant="secondary">
                                {addNewRecord.label}
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
