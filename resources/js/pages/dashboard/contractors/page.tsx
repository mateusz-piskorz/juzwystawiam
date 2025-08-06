import type { BreadcrumbItem } from '@/lib/types';

import { DashboardHeading } from '@/components/common/dashboard-heading';

import { TableContractor } from '@/features/table-contractor';
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
                <DashboardHeading title={locale.Contractors} description={locale['Manage your contractors and their details.']} />
                <TableContractor />
            </MainContentLayout>
        </AppLayout>
    );
};

export default ContractorsPage;
