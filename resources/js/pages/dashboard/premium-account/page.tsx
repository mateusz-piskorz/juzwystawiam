import type { BreadcrumbItem } from '@/lib/types';

import { SectionDashboardPremiumAccount } from '@/features/section-dashboard-premium-account';
import { TablePayments } from '@/features/table-payments';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const PremiumAccountPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/premium-account'], common: l.common };

    const searchParams = useSearchParams();
    const checkoutSuccess = searchParams.get('checkout') === 'success';

    useEffect(() => {
        if (checkoutSuccess) {
            toast.success(locale['Payment successful! Your premium account will be activated shortly.']);
            searchParams.clear('checkout');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale['Premium Account'],
            href: '/dashboard/premium-account',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Premium Account']} />
            <MainContentLayout className="flex flex-col gap-5 md:gap-10 md:bg-transparent md:p-0">
                <SectionDashboardPremiumAccount />
                <div className="md:bg-sidebar md:rounded md:p-6">
                    <TablePayments />
                </div>
            </MainContentLayout>
        </AppLayout>
    );
};

export default PremiumAccountPage;
