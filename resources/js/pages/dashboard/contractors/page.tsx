import { ContractorsTable } from '@/components/dashboard/contractors/contractors-table';
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
        title: 'Contractors',
        href: '/dashboard/contractors',
    },
];

const ContractorsPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contractors" />
            <MainContentLayout headerText="Contractors">
                <ContractorsTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ContractorsPage;
