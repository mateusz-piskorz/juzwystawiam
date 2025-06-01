import { ContractorsTable } from '@/components/contractors/contractors-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contractors',
        href: 'dashboard/contracotrs',
    },
];

const ContractorsPage = (props: any) => {
    console.log(props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contractors" />
            {/* <div className="h-full flex-1 rounded-xl p-4">here 123</div> */}
            <ContractorsTable />
        </AppLayout>
    );
};

export default ContractorsPage;
