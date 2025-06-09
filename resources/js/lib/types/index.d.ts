import type { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

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

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string; query: { [key: string]: string | undefined } };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

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

export type Contractor = {
    id: number;
    user_id: number;
    is_own_company: boolean;
    name: string;
    nip: string;
    postal_code: string;
    building_number: string;
    city: string;
    street_name: string | null;
    email: string | null;
    country: string | null;
    phone: string | null;
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

type QueryValue = string | number | string[] | number[];
