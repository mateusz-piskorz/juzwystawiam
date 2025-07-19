import { DisplayPremiumDays } from '@/components/common/display-premium-days';
import { MainAnalyticChart } from '@/components/dashboard/analytics/main-analytic-chart';
import { InvoiceTable } from '@/components/dashboard/invoices/invoice-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { usePremium } from '@/lib/hooks/use-premium';
import { type BreadcrumbItem } from '@/lib/types';

import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function DashboardPage() {
    const { hasPremium } = usePremium();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <MainContentLayout className="flex flex-col gap-14 md:gap-4 md:bg-transparent md:p-0 xl:gap-10">
                <div className="flex flex-col gap-14 md:h-[300px] md:flex-row md:gap-4 xl:gap-10">
                    <div className="md:bg-sidebar flex-2/3 space-y-12 md:space-y-8 md:overflow-y-auto md:rounded md:p-6">
                        <h1 className="mb-5 text-xl">Latest invoices</h1>
                        <InvoiceTable displayDataTableToolbar={false} withFilters={false} displayPagination={false} />
                    </div>

                    <div className="md:bg-sidebar flex-1/3 space-y-2 md:rounded md:p-6">
                        <h1 className="mb-2 text-xl">Premium Status</h1>
                        <p>
                            Your premium account is {hasPremium ? 'active' : 'inactive'}. You have <DisplayPremiumDays /> left.
                        </p>
                        <Link href="/dashboard/premium-account">
                            <Button variant="secondary">Manage</Button>
                        </Link>
                    </div>
                </div>

                <div className="md:bg-sidebar md:rounded md:p-6">
                    <h1 className="mb-5 text-xl">Invoices</h1>
                    <MainAnalyticChart withFilters={false} className="" />
                </div>
            </MainContentLayout>
        </AppLayout>
    );
}
