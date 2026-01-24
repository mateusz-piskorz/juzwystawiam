import type { BreadcrumbItem } from '@/lib/types';

import { DashboardHeading } from '@/components/common/dashboard-heading';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { Invoice } from '@/lib/types/invoice';
import { Head } from '@inertiajs/react';
import { SectionInvoiceActions } from './partials/section-invoice-actions';
import { SectionInvoiceDetails } from './partials/section-invoice-details';
import { TableInvoiceEmail } from './partials/table-invoice-email';
import { TableInvoiceProduct } from './partials/table-invoice-product';

const InvoicePage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common };

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
    ];

    const seller = invoice.invoice_contractors.find((e) => e.role === 'SELLER');
    const buyer = invoice.invoice_contractors.find((e) => e.role === 'BUYER');
    console.log(invoice);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={locale.common.Invoices} />
                <div className="space-y-8 py-8">
                    <SectionInvoiceDetails invoice={invoice} seller={seller} buyer={buyer} />
                    <Separator />
                    <SectionInvoiceActions invoiceId={invoice.id} buyerEmail={buyer?.email} />
                    <Separator />
                    <div className="px-4 md:px-8">
                        <DashboardHeading title={locale['Invoice Products']} description={locale['Manage your invoice products and see details']} />
                        <TableInvoiceProduct data={invoice.invoice_products} />
                    </div>
                    <Separator />
                    <div className="px-4 md:px-8">
                        <DashboardHeading
                            title={locale['Invoice Emails']}
                            description={locale['View and manage invoice emails and delivery status']}
                        />
                        <TableInvoiceEmail data={invoice.invoice_emails} />
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default InvoicePage;
