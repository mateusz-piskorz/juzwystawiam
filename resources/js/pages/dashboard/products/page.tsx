import { DashboardHeading } from '@/components/common/dashboard-heading';
import { ProductTable } from '@/components/dashboard/products/product-table';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const ProductsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/products'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale.Products,
            href: '/dashboard/products',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.Products} />
            <MainContentLayout>
                <DashboardHeading title={locale.Products} description={locale['Manage your products and see details.']} />
                <ProductTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ProductsPage;
