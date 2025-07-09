/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Select } from '@/components/common/select';
import { InvoiceForm } from '@/components/dashboard/invoices/invoice-form';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import type { BreadcrumbItem } from '@/lib/types';
import { Invoice } from '@/lib/types/invoice';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const EditInvoicePage = () => {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Invoice ${invoice.number}`} />
            <MainContentLayout className="p-0 md:p-0">
                <div className="flex items-center gap-2 px-4 pt-4 md:px-6 md:pt-6">
                    <h1>
                        <span className="text-muted-foreground">Edit Invoice</span> {invoice.number}
                    </h1>
                    <Select
                        defaultValue={invoiceType}
                        label="Invoice type"
                        onValueChange={(val) => setInvoiceType(val as INVOICE_TYPE)}
                        options={Object.values(INVOICE_TYPE).map((e) => ({ label: e, value: e }))}
                    />
                </div>
                <InvoiceForm
                    // @ts-ignore Warning: This is a TypeScript quirk! Don't look.
                    defaultValues={{
                        ...invoice,
                        type: invoiceType,
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

export default EditInvoicePage;
