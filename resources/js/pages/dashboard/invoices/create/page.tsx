import type { BreadcrumbItem } from '@/lib/types';

import { FormInvoice } from '@/features/form-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const CreateInvoicePage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common, enum: l.enum };

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
            title: locale['Create invoice'],
            href: route('invoices.create'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Create invoice']} />

            <FormInvoice />
        </AppLayout>
    );
};

export default CreateInvoicePage;
