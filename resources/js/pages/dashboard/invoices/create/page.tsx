import { VatForm } from '@/components/invoices/forms/vat-form';
import AppLayout from '@/layouts/app-layout';
import { InvoiceType } from '@/lib/constants/invoiceTypes';
import { usePage } from '@/lib/hooks/use-page';
import { BreadcrumbItem } from '@/lib/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'create invoice',
        href: 'dashboard/invoices/create',
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
            <div className="flex h-full flex-1 flex-col gap-8 rounded-xl p-4">
                <h1 className="font-bold">Invoice Type: {invoice_type ?? InvoiceType.VAT}</h1>
                <div>{invoiceForm}</div>
            </div>
        </AppLayout>
    );
};

export default CreateInvoicePage;
