import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    totalPages: number;
}

export function DataTablePagination<TData>({ table, totalPages }: DataTablePaginationProps<TData>) {
    const locale = useLocale().locale.common['data-table'];
    const searchParams = useSearchParams();
    const limit = searchParams.get('limit');
    const page = (searchParams.get('page') as unknown as number) ?? 1;

    const handlePageChange = (action: 'prev' | 'next') => {
        searchParams.set({ page: String(Number(page) + (action === 'next' ? 1 : -1)) });
    };

    return (
        <div className="mt-2 flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-between gap-4 sm:gap-0">
                <div className="flex items-center space-x-2">
                    <p className="hidden text-sm font-medium sm:inline-block">{locale['Rows per page']}</p>
                    <Select
                        value={limit ? String(limit) : '25'}
                        onValueChange={(value) => {
                            searchParams.set({ limit: value });
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px] rounded">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={String(pageSize)}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex">
                    <div className="hidden w-[100px] items-center justify-center text-sm font-medium sm:flex">
                        {locale.Page} {page} {locale.of} {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="hidden size-8 md:flex"
                            onClick={() => searchParams.set({ page: '1' })}
                            disabled={page === 1}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft />
                        </Button>
                        <Button variant="outline" size="icon" className="size-8" onClick={() => handlePageChange('prev')} disabled={page === 1}>
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft />
                        </Button>
                        <span className="sm:hidden">
                            {page} of {table.getPageCount()}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => handlePageChange('next')}
                            disabled={page === totalPages}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="hidden size-8 md:flex"
                            onClick={() => searchParams.set({ page: String(totalPages) })}
                            disabled={page === totalPages}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
