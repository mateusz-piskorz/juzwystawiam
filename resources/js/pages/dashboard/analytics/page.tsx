import type { BreadcrumbItem } from '@/lib/types';

import { DashboardHeading } from '@/components/common/dashboard-heading';
import { InvoicesAnalyticsChart } from '@/features/invoices-analytics-chart';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const AnalyticsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/analytics'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale.Analytics,
            href: route('analytics'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.Analytics} />
            <div className="px-4 py-4 md:px-8">
                <DashboardHeading title={locale.common.Invoices} description={locale['Analytics and statistics for your invoices']} />
                <InvoicesAnalyticsChart />
            </div>
        </AppLayout>
    );
};

export default AnalyticsPage;
