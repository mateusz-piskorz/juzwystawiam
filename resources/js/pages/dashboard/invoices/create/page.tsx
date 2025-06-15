import { VatForm } from '@/components/invoices/forms/vat-form';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { InvoiceType } from '@/lib/constants/enums/invoice-type';

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

    let invoiceForm = null;

    switch (invoice_type) {
        case InvoiceType.VAT:
            invoiceForm = <VatForm />;
            break;
        // case InvoiceType.NO_VAT:
        //     invoiceForm = <NoVatForm />;
        //     break;
        // case InvoiceType.Receipt:
        //     invoiceForm = <ReceiptForm />;
        //     break;
        // case InvoiceType.Correction:
        //     invoiceForm = <CorrectionForm />;
        //     break;
        default:
            invoiceForm = <VatForm />;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create invoice" />
            <MainContentLayout className="p-0">{invoiceForm}</MainContentLayout>
        </AppLayout>
    );
};

export default CreateInvoicePage;
