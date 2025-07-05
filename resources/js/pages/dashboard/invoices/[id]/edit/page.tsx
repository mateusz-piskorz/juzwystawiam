import { Select } from '@/components/common/select';
import { InvoiceForm } from '@/components/dashboard/invoices/common/InvoiceForm';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import type { BreadcrumbItem } from '@/lib/types';
import { Invoice } from '@/lib/types/invoice';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const InvoiceListPage = () => {
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
        {
            title: `Edit Invoice ${invoice.id}`,
            href: `/dashboard/invoices/${invoice.id}/edit`,
        },
    ];

    const [invoiceType, setInvoiceType] = useState(invoice.type);
    console.log(invoiceType);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Invoice ${invoice.number}`} />
            <MainContentLayout>
                {/* <h1>Edit Invoice ${invoice.id}</h1> */}
                <div className="flex items-center gap-2 pt-4 pl-4">
                    <p className="hidden sm:inline-block">Invoice type</p>
                    <Select
                        defaultValue={invoiceType}
                        label="Invoice type"
                        onValueChange={(val) => setInvoiceType(val as INVOICE_TYPE)}
                        options={Object.values(INVOICE_TYPE).map((e) => ({ label: e, value: e }))}
                    />
                </div>
                <InvoiceForm
                    type={invoiceType}
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
