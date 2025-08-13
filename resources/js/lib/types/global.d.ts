/* eslint-disable @typescript-eslint/no-unused-vars */

import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        title: string;
        initialVisibility?: 'hidden';
    }
}
