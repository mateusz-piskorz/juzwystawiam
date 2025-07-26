import { Heading } from '@/components/common/heading';
import { MainAnalyticChart } from '@/components/dashboard/analytics/main-analytic-chart';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Analytics',
        href: '/dashboard/analytics',
    },
];

const AnalyticsPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <MainContentLayout>
                <Heading title="Invoices" description="Analytics and statistics for your invoices." />
                <MainAnalyticChart />
            </MainContentLayout>
        </AppLayout>
    );
};

export default AnalyticsPage;
