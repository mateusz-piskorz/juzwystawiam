import type { BreadcrumbItem } from '@/lib/types';

import { PremiumStatusHeading } from '@/components/common/premium-status-heading';
import { BenefitsSection } from '@/components/dashboard/premium-account/benefits-section';
import { BuyPremiumSection } from '@/components/dashboard/premium-account/buy-premium-section';

import { PaymentsTable } from '@/components/dashboard/premium-account/payments-table';
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
                <div className="md:bg-sidebar space-y-12 md:space-y-8 md:rounded md:p-6">
                    <PremiumStatusHeading />
                    <BenefitsSection />
                    <BuyPremiumSection />
                </div>
                <div className="md:bg-sidebar md:rounded md:p-6">
                    <PaymentsTable />
                </div>
            </MainContentLayout>
        </AppLayout>
    );
};

export default PremiumAccountPage;
