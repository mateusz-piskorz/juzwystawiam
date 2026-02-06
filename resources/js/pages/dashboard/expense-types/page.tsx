import { DashboardHeading } from '@/components/common/dashboard-heading';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { TableExpenseType } from './partials/table-expense-type';

const ExpenseTypesPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expense-types'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale['Expense Types'],
            href: route('expense-types'),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Expense Types']} />
            <div className="px-4 py-4 md:px-8">
                <DashboardHeading title={locale['Expense Types']} description={locale['Manage your expense types and see details.']} />
                <TableExpenseType />
            </div>
        </AppLayout>
    );
};

export default ExpenseTypesPage;
