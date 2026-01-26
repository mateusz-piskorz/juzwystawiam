/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { BreadcrumbItem } from '@/lib/types';

import { FormInvoice } from '@/features/form-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Invoice } from '@/lib/types/invoice';
import { Head, usePage } from '@inertiajs/react';

const EditInvoicePage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common, enum: l.enum };
    const {
        props: { invoice },
    } = usePage<{ invoice: Invoice }>();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale.common.Invoices,
            href: route('invoices'),
        },
        {
            title: `${locale.Invoice} ${invoice.id}`,
            href: route('invoices.show', invoice.id),
        },
        {
            title: `${locale['Edit invoice']} ${invoice.id}`,
            href: route('invoices.edit', invoice.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${locale['Edit invoice']} ${invoice.id}`} />

            <div className="flex items-center gap-2 px-4 pt-4 md:px-6 md:pt-6">
                <h1>
                    <span className="text-muted-foreground">{locale['Edit invoice']} </span> {invoice.number}
                </h1>
            </div>
            <FormInvoice invoice={invoice} />
        </AppLayout>
    );
};

export default EditInvoicePage;
