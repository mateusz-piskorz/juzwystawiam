import type { BreadcrumbItem } from '@/lib/types';

import { Heading } from '@/components/common/heading';
import { ContractorTable } from '@/components/dashboard/contractors/contractor-table';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { MainContentLayout } from '@/layouts/dashboard/main-content-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const ContractorsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/contractors'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale.Contractors,
            href: '/dashboard/contractors',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.Contractors} />
            <MainContentLayout>
                <Heading title={locale.Contractors} description={locale['Manage your contractors and their details.']} />
                <ContractorTable />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ContractorsPage;
