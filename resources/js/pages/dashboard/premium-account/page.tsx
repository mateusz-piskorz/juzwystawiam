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
                <div className="flex flex-col gap-2">
                    <a href="/dashboard/premium-account/buy?days=1">Buy 1 day of premium</a>
                    <a href="#">Buy 7 days of premium</a>
                </div>
            </MainContentLayout>
        </AppLayout>
    );
};

export default PremiumAccountPage;
