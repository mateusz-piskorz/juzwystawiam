import type { BreadcrumbItem } from '@/lib/types';

import { Heading } from '@/components/common/heading';
import { MainAnalyticChart } from '@/components/dashboard/analytics/main-analytic-chart';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const AnalyticsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/analytics'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale.Analytics,
            href: '/dashboard/analytics',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.Analytics} />
            <MainContentLayout>
                <Heading title={locale.common.Invoices} description={locale['Analytics and statistics for your invoices']} />
                <MainAnalyticChart />
            </MainContentLayout>
        </AppLayout>
    );
};

export default AnalyticsPage;
