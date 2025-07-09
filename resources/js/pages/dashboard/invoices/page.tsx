import { InvoicesTable } from '@/components/dashboard/invoices/invoice-table';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import type { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Invoices',
        href: '/dashboard/invoices',
    },
];

const InvoiceListPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <MainContentLayout>
                <h1 className="mb-5 text-xl">Invoices</h1>
                <InvoicesTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoiceListPage;
