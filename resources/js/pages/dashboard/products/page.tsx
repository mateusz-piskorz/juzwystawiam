import { DashboardHeading } from '@/components/common/dashboard-heading';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { TableProduct } from './partials/table-product';

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
            <div className="px-4 py-4 md:px-8">
                <DashboardHeading title={locale.Products} description={locale['Manage your products and see details.']} />
                <TableProduct />
            </div>
        </AppLayout>
    );
};

export default ProductsPage;
