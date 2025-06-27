import { ProductsTable } from '@/components/dashboard/products/products-table';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/dashboard/products',
    },
];

const ProductsPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contractors" />
            <MainContentLayout headerText="Products">
                <ProductsTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ProductsPage;
