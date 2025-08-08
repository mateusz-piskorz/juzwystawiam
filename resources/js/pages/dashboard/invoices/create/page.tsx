import type { BreadcrumbItem } from '@/lib/types';

import { Select } from '@/components/common/select';

import { FormInvoice } from '@/features/form-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const CreateInvoicePage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common, enum: l.enum };
    const [invoiceType, setInvoiceType] = useState(INVOICE_TYPE.VAT);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Invoices,
            href: '/dashboard/invoices',
        },
        {
            title: locale['Create invoice'],
            href: '/dashboard/invoices/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Create invoice']} />
            <MainContentLayout className="p-0 md:p-0">
                <div className="flex items-center gap-2 px-4 pt-4 md:px-6 md:pt-6">
                    <p className="hidden sm:inline-block">{locale['Invoice type']}</p>

                    <Select
                        defaultValue={invoiceType}
                        label={locale['Invoice type']}
                        onValueChange={(val) => setInvoiceType(val)}
                        options={Object.values(INVOICE_TYPE).map((val) => ({ label: locale.enum.INVOICE_TYPE[val], value: val }))}
                    />
                </div>

                <FormInvoice
                    type={invoiceType}
                    defaultValues={{
                        type: invoiceType,
                        is_already_paid: true,
                        number: '2/07/2025',
                        invoice_products: [{ name: '', measure_unit: MEASURE_UNIT.PCS, quantity: 1, price: 0 }],
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        invoice_contractors: [{ role: CONTRACTOR_ROLE.SELLER }, { role: CONTRACTOR_ROLE.BUYER }],
                    }}
                />
            </MainContentLayout>
        </AppLayout>
    );
};

export default CreateInvoicePage;
