import type { BreadcrumbItem } from '@/lib/types';

import { DashboardHeading } from '@/components/common/dashboard-heading';
import { TableInvoice } from '@/features/table-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';
import { RecentInvoices } from './partials/recent-invoices';

const InvoiceListPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale.common.Invoices,
            href: route('invoices'),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.common.Invoices} />
            <div className="p-4 md:px-8">
                <DashboardHeading title={locale['Latest Invoices']} />
                <RecentInvoices />
                <DashboardHeading className="mt-4" title={locale.common.Invoices} description={locale['Manage your invoices and see details.']} />
                <TableInvoice />
            </div>
        </AppLayout>
    );
};

export default InvoiceListPage;
