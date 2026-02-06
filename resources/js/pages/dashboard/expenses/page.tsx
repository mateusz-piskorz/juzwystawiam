import { DashboardHeading } from '@/components/common/dashboard-heading';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';
import { TableExpense } from './partials/table-expense';

const ExpenseTypesPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expenses'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale['Expenses'],
            href: route('expense-types'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Expense']} />
            <div className="px-4 py-4 md:px-8">
                <DashboardHeading title={locale['Expense']} description={locale['Manage your expenses and see details.']} />
                <TableExpense />
            </div>
        </AppLayout>
    );
};

export default ExpenseTypesPage;
