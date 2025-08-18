import type { BreadcrumbItem } from '@/lib/types';

import { PremiumStatusHeading } from '@/components/common/premium-status-heading';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { SectionBenefits } from './partials/section-benefits';
import { SectionBuyPremium } from './partials/section-buy-premium';
import { TablePayments } from './partials/table-payments';

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
            href: route('dashboard'),
        },
        {
            title: locale['Premium Account'],
            href: route('premium-account'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Premium Account']} />
            <div className="space-y-8 py-8">
                <div className="px-4 md:space-y-8 md:rounded md:px-8">
                    <PremiumStatusHeading />
                    <SectionBenefits />
                </div>
                <Separator orientation="horizontal" />
                <div className="px-4 md:space-y-8 md:rounded md:px-8">
                    <SectionBuyPremium />
                </div>
                <Separator orientation="horizontal" />
                <TablePayments />
            </div>
        </AppLayout>
    );
};

export default PremiumAccountPage;
