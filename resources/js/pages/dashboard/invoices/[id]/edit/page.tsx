import { InvoiceForm } from '@/components/dashboard/invoices/common/InvoiceForm';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import type { BreadcrumbItem } from '@/lib/types';
import { Invoice } from '@/lib/types/invoice';
import { Head, usePage } from '@inertiajs/react';

const InvoiceListPage = () => {
    const {
        props: { invoice },
    } = usePage<{ invoice: Invoice }>();
    console.log(invoice);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Invoices',
            href: '/dashboard/invoices',
        },
        {
            title: `Invoice ${invoice.id}`,
            href: `/dashboard/invoices/${invoice.id}`,
        },
        {
            title: `Edit Invoice ${invoice.id}`,
            href: `/dashboard/invoices/${invoice.id}/edit`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <MainContentLayout headerText={`Edit Invoice ${invoice.id}`}>
                <InvoiceForm
                    type={invoice.type}
                    defaultValues={{
                        ...invoice,
                        issue_date: new Date(invoice.issue_date),
                        sale_date: new Date(invoice.sale_date),
                        due_date: new Date(invoice.due_date),
                    }}
                    invoiceId={invoice.id}
                />
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoiceListPage;
