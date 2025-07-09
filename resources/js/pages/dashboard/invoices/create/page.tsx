import { Select } from '@/components/common/select';
import { InvoiceForm } from '@/components/dashboard/invoices/invoice-form';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { CURRENCY } from '@/lib/constants/enums/currency';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { PAYMENT_METHOD } from '@/lib/constants/enums/payment-method';
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
    console.log(invoiceType);
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
                    defaultValues={{
                        type: invoiceType,
                        is_already_paid: true,
                        number: '2/07/2025',
                        invoice_products: [{ name: '', measure_unit: MEASURE_UNIT.PCS, quantity: 1, price: 0 }],
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        invoice_contractors: [{ role: CONTRACTOR_ROLE.SELLER }, { role: CONTRACTOR_ROLE.BUYER }],
                        currency: CURRENCY.PLN,
                        sale_date: new Date('2025-06-20T22:00:00.000Z'),
                        due_date: new Date('2025-06-23T22:00:00.000Z'),
                        issue_date: new Date('2025-06-22T22:00:00.000Z'),
                        payment_method: PAYMENT_METHOD.CARD,
                    }}
                />
            </MainContentLayout>
        </AppLayout>
    );
};

export default CreateInvoicePage;
