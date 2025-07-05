import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { deleteInvoice } from '@/lib/data/invoices';
import { usePage } from '@/lib/hooks/use-page';
import type { BreadcrumbItem } from '@/lib/types';
import { Invoice } from '@/lib/types/invoice';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

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

    const handleDelete = async () => {
        try {
            const response = await deleteInvoice({ invoiceId: invoice.id });
            toast.success(response.message);
            router.visit(`/dashboard/invoices`);
        } catch (error: unknown) {
            toast.error('something went wrong');
            console.error(error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Invoice ${invoice.number}`} />
            <MainContentLayout headerText={`Invoice ${invoice.id}`}>
                <div className="flex justify-end">
                    <Button variant="secondary">
                        <a href={`/dashboard/invoices/${invoice.id}/pdf-preview`} target="_blank">
                            Preview
                        </a>
                    </Button>
                    <Button variant="secondary">
                        <a href={`/dashboard/invoices/${invoice.id}/pdf-download`} target="_blank">
                            Download
                        </a>
                    </Button>
                    <Button variant="secondary">
                        <Link href={`/dashboard/invoices/${invoice.id}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete this invoice
                    </Button>
                </div>
                <pre>{JSON.stringify(invoice, null, 2)}</pre>
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoicePage;
