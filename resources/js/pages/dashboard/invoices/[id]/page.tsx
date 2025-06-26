import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { usePage } from '@/lib/hooks/use-page';
import type { BreadcrumbItem } from '@/lib/types';
import { Invoice } from '@/lib/types/invoice';
import { Head, Link } from '@inertiajs/react';

const InvoicePage = () => {
    const {
        props: { invoice },
    } = usePage<{ invoice: Invoice }>();

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
    ];
    console.log(invoice);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Invoice ${invoice.id}`} />
            <MainContentLayout headerText={`Invoice ${invoice.id}`}>
                <div className="flex justify-end">
                    <Button variant="secondary">
                        <Link href={`/dashboard/invoices/${invoice.id}/edit`}>Edit this invoice</Link>
                    </Button>
                </div>
                <pre>{JSON.stringify(invoice, null, 2)}</pre>
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoicePage;
