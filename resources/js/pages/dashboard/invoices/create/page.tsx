import type { BreadcrumbItem } from '@/lib/types';

import { Select } from '@/components/common/select';
import { InvoiceForm } from '@/components/dashboard/invoices/invoice-form';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
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
                <div className="flex items-center gap-2 px-4 pt-4 md:px-6 md:pt-6">
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
