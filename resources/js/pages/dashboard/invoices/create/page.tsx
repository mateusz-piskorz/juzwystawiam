import { InvoiceForm } from '@/components/dashboard/invoices/common/InvoiceForm';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { usePage } from '@/lib/hooks/use-page';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'invoices',
        href: '/dashboard/invoices',
    },
    {
        title: 'create invoice',
        href: '/dashboard/invoices/create',
    },
];

const CreateInvoicePage = () => {
    const {
        props: { ziggy },
    } = usePage();
    const { invoice_type } = ziggy.query;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create invoice" />
            <MainContentLayout className="p-0">
                <InvoiceForm type={(invoice_type as INVOICE_TYPE) || INVOICE_TYPE.VAT} />
            </MainContentLayout>
        </AppLayout>
    );
};

export default CreateInvoicePage;
