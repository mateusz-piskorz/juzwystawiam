import { DashboardHeading } from '@/components/common/dashboard-heading';
import { InvoiceStatusDonutChart } from '@/features/invoice-status-donut-chart';

import { InvoicesAnalyticsChart } from '@/features/invoices-analytics-chart';
import { TableInvoice } from '@/features/table-invoice';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import type { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

export default function DashboardPage() {
    const { locale } = useLocale();
    console.log('locale', locale);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.common.Dashboard} />

            <div className="px-4 py-8 md:px-8">
                <DashboardHeading title={locale.common.Invoices} />
                <InvoicesAnalyticsChart withFilters={false} className="" />
            </div>

            <div className="flex flex-col gap-8 p-4 md:flex-row md:p-8">
                <div className="flex-4/5">
                    <TableInvoice displaySearchBar={false} displayEmailStatusColumn={false} />
                </div>
                <div className="flex-1/5">
                    <InvoiceStatusDonutChart />
                </div>
            </div>
        </AppLayout>
    );
}
