import { DashboardHeading } from '@/components/common/dashboard-heading';
import { PremiumStatusHeading } from '@/components/common/premium-status-heading';
import { MainAnalyticChart } from '@/components/dashboard/analytics/main-analytic-chart';
import { InvoiceTable } from '@/components/dashboard/invoices/invoice-table';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import type { BreadcrumbItem } from '@/lib/types';
import { Head, Link } from '@inertiajs/react';

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

            <MainContentLayout className="flex flex-col gap-14 md:gap-4 md:bg-transparent md:p-0">
                <div className="flex flex-col gap-14 md:h-[300px] md:flex-row md:gap-4">
                    <div className="md:bg-sidebar flex-2/3 space-y-12 md:space-y-8 md:overflow-y-auto md:rounded md:p-6">
                        <DashboardHeading title={locale.dashboard['Latest invoices']} />
                        <InvoiceTable displayDataTableToolbar={false} withFilters={false} displayPagination={false} />
                    </div>

                    <div className="md:bg-sidebar flex-1/3 space-y-2 md:rounded md:p-6">
                        <PremiumStatusHeading />
                        <Link href="/dashboard/premium-account">
                            <Button variant="secondary">{locale.common.Manage}</Button>
                        </Link>
                    </div>
                </div>

                <div className="md:bg-sidebar md:rounded md:p-6">
                    <DashboardHeading title={locale.common.Invoices} />
                    <MainAnalyticChart withFilters={false} className="" />
                </div>
            </MainContentLayout>
        </AppLayout>
    );
}
