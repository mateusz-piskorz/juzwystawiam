import { Heading } from '@/components/common/heading';
import { ProductTable } from '@/components/dashboard/products/product-table';
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
            <Head title="Products" />
            <MainContentLayout>
                <Heading title="Products" description="Manage your products and see details." />
                <ProductTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ProductsPage;
