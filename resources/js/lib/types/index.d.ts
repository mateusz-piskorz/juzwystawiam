import type { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { MEASURE_UNIT } from '../constants/enums/measure-unit';
import { VAT_RATE } from '../constants/enums/vat-rate';
import { CreateContractorDTO } from '../constants/zod/contractors';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type SharedData = {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string; query: { [key: string]: string } };
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Pagination<T = Record<string, unknown>> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export type Todo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    timestamp: string;
};

export type Invoice = {
    id: string;
    user_id: string;
    number: string;
    type: string;
    issue_date: string;
    sale_date: string | null;
    due_date: string | null;
    total_paid: string | null;
    status: string | null;
    payment_method: string | null;
    currency: string | null;
    language: string | null;
    notes: string | null;
    template: string | null;
    contractors: Contractor[];
    items: InvoiceItem[];
    created_at: string;
    updated_at: string;
};

export type Contractor = CreateContractorDTO & {
    id: number;
    updated_at: string; // Date
    created_at: string; // Date
};

export type Product = {
    id: number;
    user_id: number;
    price: number;
    measure_unit: MEASURE_UNIT;
    vat_rate: VAT_RATE;
    discount: number;
    updated_at: string; // Date
    created_at: string; // Date
};

export type InvoiceItem = {
    id: string;
    name: string;
    quantity: number;
    unit?: string | null;
    net_price: string;
    gross_price: string;
    vat_rate?: string | null;
    pkwiu?: string | null;
    gtu?: string | null;
    discount?: string | null;
    [key: string]: unknown;
};

export type QueryValue = string | number | string[] | number[];

export type KeysInType<T, Type> = {
    [K in keyof T]: T[K] extends ReadonlyArray ? never : T[K] extends Type ? K : never;
}[keyof T];

type Example = {
    foo: string;
    bar: {
        baz: number;
        arr: { deep: number; skip: string }[];
    };
    items: { price: number; label: number }[];
};

// works similar to FieldPath<FieldValues> but You can restrain a field to specific type e.g. Boolean|String|Date
export type TypedFieldPath<T, Type, Prefix extends string = ''> = {
    [K in keyof T]: T[K] extends ReadonlyArray<infer U> // If T[K] is an array of objects, add ${number} to the path and recurse
        ? U extends object
            ? TypedFieldPath<U, Type, `${Prefix}${K & string}.${number}.`>
            : never
        : // If T[K] matches Type, include the key (with prefix)
          T[K] extends Type
          ? `${Prefix}${K & string}`
          : // If T[K] is an object, recurse (add prefix)
            T[K] extends object
            ? TypedFieldPath<T[K], Type, `${Prefix}${K & string}.`>
            : never;
}[keyof T];

export type Nullable<T> = T | null | undefined;
