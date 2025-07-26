import { Heading } from '@/components/common/heading';
import { InvoiceTable } from '@/components/dashboard/invoices/invoice-table';
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
                <Heading title="Invoices" description="Manage your invoices and see details." />
                <InvoiceTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoiceListPage;
