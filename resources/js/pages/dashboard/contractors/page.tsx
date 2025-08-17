import type { BreadcrumbItem } from '@/lib/types';

import { DashboardHeading } from '@/components/common/dashboard-heading';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';
import { TableContractor } from './partials/table-contractor';

const ContractorsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/contractors'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale.Contractors,
            href: route('contractors'),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.Contractors} />
            <div className="px-4 py-4 md:px-8">
                <DashboardHeading title={locale.Contractors} description={locale['Manage your contractors and their details.']} />
                <TableContractor />
            </div>
        </AppLayout>
    );
};

export default ContractorsPage;
