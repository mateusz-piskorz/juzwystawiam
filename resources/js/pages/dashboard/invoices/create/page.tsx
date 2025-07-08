import { Select } from '@/components/common/select';
import { InvoiceForm } from '@/components/dashboard/invoices/common/InvoiceForm';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
    const [invoiceType, setInvoiceType] = useState(INVOICE_TYPE.VAT);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create invoice" />
            <MainContentLayout className="p-0 md:p-0">
                <div className="flex items-center gap-2 pt-4 pl-4">
                    <p className="hidden sm:inline-block">Invoice type</p>
                    <Select
                        defaultValue={invoiceType}
                        label="Invoice type"
                        onValueChange={(val) => setInvoiceType(val as INVOICE_TYPE)}
                        options={Object.values(INVOICE_TYPE).map((e) => ({ label: e, value: e }))}
                    />
                </div>
                <InvoiceForm type={invoiceType} />
            </MainContentLayout>
        </AppLayout>
    );
};

export default CreateInvoicePage;
