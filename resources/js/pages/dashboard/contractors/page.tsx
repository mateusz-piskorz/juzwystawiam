import type { BreadcrumbItem } from '@/lib/types';

import { Heading } from '@/components/common/heading';
import { ContractorTable } from '@/components/dashboard/contractors/contractor-table';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
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
            <MainContentLayout>
                <Heading title="Contractors" description="Manage your contractors and their details." />
                <ContractorTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ContractorsPage;
