import { InvoiceActionsSection } from '@/components/dashboard/invoices/[id]/invoice-actions-section';
import { InvoiceEmailTable } from '@/components/dashboard/invoices/[id]/invoice-email-table';
import { InvoiceProductTable } from '@/components/dashboard/invoices/[id]/invoice-product-table';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { usePage } from '@/lib/hooks/use-page';
import type { BreadcrumbItem } from '@/lib/types';
import { Invoice } from '@/lib/types/invoice';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';

// todo: view to create

const InvoicePage = () => {
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
    ];

    const seller = invoice.invoice_contractors.find((e) => e.role === CONTRACTOR_ROLE.SELLER);
    const buyer = invoice.invoice_contractors.find((e) => e.role === CONTRACTOR_ROLE.BUYER);

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Invoices" />
                <MainContentLayout className="flex flex-col gap-5 md:gap-10 md:bg-transparent md:p-0">
                    <div className="md:bg-sidebar space-y-12 md:space-y-8 md:rounded md:p-6">
                        <div>
                            <h1 className="mb-2 text-xl font-medium">{invoice.number}</h1>
                            <p>Here you can check details about your invoice.</p>
                        </div>
                        <div>
                            <h1 className="mb-2 text-xl font-medium">Details</h1>
                            <ul>
                                <li>
                                    Number: <span className="text-muted-foreground">{invoice.number}</span>
                                </li>
                                <li>
                                    Seller:{' '}
                                    <span className="text-muted-foreground">
                                        {seller?.company_name}, {seller?.street_name}, {seller?.postal_code}, {seller?.city}
                                    </span>
                                </li>
                                <li>
                                    Buyer:{' '}
                                    <span className="text-muted-foreground">
                                        {buyer?.company_name}, {buyer?.street_name}, {buyer?.postal_code}, {buyer?.city}
                                    </span>
                                </li>
                                <li>
                                    Create Date: <span className="text-muted-foreground">{dayjs(invoice.created_at).format('DD-MM-YYYY')}</span>
                                </li>
                                <li>
                                    Sale Date: <span className="text-muted-foreground">{dayjs(invoice.sale_date).format('DD-MM-YYYY')}</span>
                                </li>
                                <li>
                                    Grand Total: <span className="text-muted-foreground">{invoice.grand_total}</span>
                                </li>
                            </ul>
                        </div>
                        <InvoiceActionsSection invoiceId={invoice.id} buyerEmail={buyer?.email} />
                    </div>
                    <div className="md:bg-sidebar md:rounded md:p-6">
                        <h1 className="mb-8 text-xl font-medium">Invoice Products</h1>
                        <InvoiceProductTable data={invoice.invoice_products} />
                    </div>
                    <div className="md:bg-sidebar md:rounded md:p-6">
                        <h1 className="mb-8 text-xl font-medium">Invoice Emails</h1>
                        <InvoiceEmailTable data={invoice.invoice_emails} />
                    </div>
                </MainContentLayout>
            </AppLayout>
        </>
    );
};

export default InvoicePage;
