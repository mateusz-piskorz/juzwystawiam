import type { BreadcrumbItem } from '@/lib/types';

import { Select } from '@/components/common/select';
import { FormInvoice } from '@/features/form-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { z } from 'zod';

const CreateInvoicePage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common, enum: l.enum };
    const [invoiceType, setInvoiceType] = useState<z.infer<typeof schemas.InvoiceType>>('VAT');

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

            <div className="flex items-center gap-2 px-4 pt-4 md:px-6 md:pt-6">
                <p className="hidden sm:inline-block">{locale['Invoice type']}</p>

                <Select
                    defaultValue={invoiceType}
                    label={locale['Invoice type']}
                    onValueChange={(val) => setInvoiceType(val)}
                    options={schemas.InvoiceType.options.map((val) => ({ label: locale.enum.INVOICE_TYPE[val], value: val }))}
                />
            </div>

            <FormInvoice
                type={invoiceType}
                defaultValues={{
                    type: invoiceType,
                    is_already_paid: true,
                    number: '2/07/2025',
                    invoice_products: [{ name: '', measure_unit: 'PCS', quantity: 1, price: 0 }],
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    invoice_contractors: [{ role: 'SELLER' }, { role: 'BUYER' }],
                }}
            />
        </AppLayout>
    );
};

export default CreateInvoicePage;
