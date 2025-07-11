import { DisplayPremiumDays } from '@/components/common/display-premium-days';
import { PaymentsTable } from '@/components/dashboard/premium-account/payments-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
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
    const searchParams = useSearchParams();
    const checkoutSuccess = searchParams.get('checkout') === 'success';

    useEffect(() => {
        if (checkoutSuccess) {
            toast.success('Payment successful! Your premium account will be activated shortly.');
            searchParams.clear('checkout');
        }
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <MainContentLayout>
                <h1 className="mb-5 text-xl">Premium account</h1>
                <DisplayPremiumDays />
                <div>
                    <h1>Buy premium</h1>
                    <a href="/dashboard/premium-account/buy?days=1">
                        <Button>Premium 1 day</Button>
                    </a>
                    <a href="/dashboard/premium-account/buy?days=7">
                        <Button>Premium 7 day</Button>
                    </a>
                    <a href="/dashboard/premium-account/buy?days=30">
                        <Button>Premium 30 day</Button>
                    </a>
                </div>
                <PaymentsTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default PremiumAccountPage;
