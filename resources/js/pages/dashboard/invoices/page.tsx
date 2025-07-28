import type { BreadcrumbItem } from '@/lib/types';

import { Heading } from '@/components/common/heading';
import { InvoiceTable } from '@/components/dashboard/invoices/invoice-table';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const InvoiceListPage = () => {
    const l = useLocale().locale.data;
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
                <Heading title={locale.common.Invoices} description={locale['Manage your invoices and see details.']} />
                <InvoiceTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default InvoiceListPage;
