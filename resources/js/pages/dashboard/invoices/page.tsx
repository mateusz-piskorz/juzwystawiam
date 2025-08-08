import type { BreadcrumbItem } from '@/lib/types';

import { DashboardHeading } from '@/components/common/dashboard-heading';

import { TableInvoice } from '@/features/table-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const InvoiceListPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale.common.Invoices,
            href: '/dashboard/invoices',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.common.Invoices} />
            <MainContentLayout>
                <DashboardHeading title={locale.common.Invoices} description={locale['Manage your invoices and see details.']} />
                <TableInvoice />
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoiceListPage;
