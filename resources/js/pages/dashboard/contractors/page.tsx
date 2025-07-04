import { ContractorTable } from '@/components/dashboard/contractors/contractor-table';
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
                <ContractorTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ContractorsPage;
