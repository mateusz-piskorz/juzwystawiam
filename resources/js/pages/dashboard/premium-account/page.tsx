import { DisplayPremiumDays } from '@/components/common/display-premium-days';
import { BenefitsSection } from '@/components/dashboard/premium-account/benefits-section';
import { BuyPremiumSection } from '@/components/dashboard/premium-account/buy-premium-section';
import { PaymentsTable } from '@/components/dashboard/premium-account/payments-table';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { usePremium } from '@/lib/hooks/use-premium';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import type { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Premium Account',
        href: '/dashboard/premium-account',
    },
];

const PremiumAccountPage = () => {
    const { hasPremium } = usePremium();
    const searchParams = useSearchParams();
    const checkoutSuccess = searchParams.get('checkout') === 'success';

    useEffect(() => {
        if (checkoutSuccess) {
            toast.success('Payment successful! Your premium account will be activated shortly.');
            searchParams.clear('checkout');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <MainContentLayout className="flex flex-col gap-5 md:gap-10 md:bg-transparent md:p-0">
                <div className="md:bg-sidebar space-y-12 md:space-y-8 md:rounded md:p-6">
                    <div>
                        <h1 className="mb-2 text-xl font-medium">Premium Status</h1>
                        <p>
                            Your premium account is {hasPremium ? 'active' : 'inactive'}. You have <DisplayPremiumDays /> left.
                        </p>
                    </div>
                    <BenefitsSection />
                    <BuyPremiumSection />
                </div>
                <div className="md:bg-sidebar md:rounded md:p-6">
                    <h1 className="mb-8 text-xl font-medium">Payments History</h1>
                    <PaymentsTable />
                </div>
            </MainContentLayout>
        </AppLayout>
    );
};

export default PremiumAccountPage;
