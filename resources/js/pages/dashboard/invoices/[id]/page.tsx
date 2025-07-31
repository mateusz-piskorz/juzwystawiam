import type { BreadcrumbItem } from '@/lib/types';

import { Heading } from '@/components/common/heading';
import { InvoiceActionsSection } from '@/components/dashboard/invoices/[id]/invoice-actions-section';
import { InvoiceEmailTable } from '@/components/dashboard/invoices/[id]/invoice-email-table';
import { InvoiceProductTable } from '@/components/dashboard/invoices/[id]/invoice-product-table';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { Invoice } from '@/lib/types/invoice';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';

const InvoicePage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common };

    const {
        props: { invoice },
    } = usePage<{ invoice: Invoice }>();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale.common.Invoices,
            href: '/dashboard/invoices',
        },
        {
            title: `${locale.Invoice} ${invoice.id}`,
            href: `/dashboard/invoices/${invoice.id}`,
        },
    ];

    const seller = invoice.invoice_contractors.find((e) => e.role === CONTRACTOR_ROLE.SELLER);
    const buyer = invoice.invoice_contractors.find((e) => e.role === CONTRACTOR_ROLE.BUYER);

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={locale.common.Invoices} />
                <MainContentLayout className="flex flex-col gap-5 md:gap-10 md:bg-transparent md:p-0">
                    <div className="md:bg-sidebar space-y-12 md:space-y-8 md:rounded md:p-6">
                        <div>
                            <h1 className="mb-2 text-xl font-medium">{invoice.number}</h1>
                            <p>{locale['Here you can check details about your invoice.']}</p>
                        </div>
                        <div>
                            <h1 className="mb-2 text-xl font-medium">{locale.Details}</h1>
                            <ul>
                                <li>
                                    {locale.Number}: <span className="text-muted-foreground">{invoice.number}</span>
                                </li>
                                <li>
                                    {locale.Seller}:{' '}
                                    <span className="text-muted-foreground">
                                        {seller?.company_name}, {seller?.street_name}, {seller?.postal_code}, {seller?.city}
                                    </span>
                                </li>
                                <li>
                                    {locale.Buyer}:{' '}
                                    <span className="text-muted-foreground">
                                        {buyer?.company_name}, {buyer?.street_name}, {buyer?.postal_code}, {buyer?.city}
                                    </span>
                                </li>
                                <li>
                                    {locale['Create Date']}:{' '}
                                    <span className="text-muted-foreground">{dayjs(invoice.created_at).format('DD-MM-YYYY')}</span>
                                </li>
                                <li>
                                    {locale['Sale Date']}:{' '}
                                    <span className="text-muted-foreground">{dayjs(invoice.sale_date).format('DD-MM-YYYY')}</span>
                                </li>
                                <li>
                                    {locale['Grand Total']}: <span className="text-muted-foreground">{invoice.grand_total}</span>
                                </li>
                            </ul>
                        </div>
                        <InvoiceActionsSection invoiceId={invoice.id} buyerEmail={buyer?.email} />
                    </div>
                    <div className="md:bg-sidebar md:rounded md:p-6">
                        <Heading title={locale['Invoice Products']} />
                        <InvoiceProductTable data={invoice.invoice_products} />
                    </div>
                    <div className="md:bg-sidebar md:rounded md:p-6">
                        <Heading title={locale['Invoice Emails']} />
                        <InvoiceEmailTable data={invoice.invoice_emails} />
                    </div>
                </MainContentLayout>
            </AppLayout>
        </>
    );
};

export default InvoicePage;
