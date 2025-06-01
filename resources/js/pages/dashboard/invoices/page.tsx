import { InvoicesTable } from '@/components/invoices/invoice-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Pagination, SharedData, Todo } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: 'dashboard/invoices',
    },
];

const InvoicePage = (props: SharedData & { todos: Pagination<Todo> }) => {
    console.log('props');
    console.log(props);
    // const {
    //         props: { todos, ziggy },
    //     } = {props : SharedData & { todos: Pagination<Todo> }}
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="h-full flex-1 rounded-xl p-4">
                here 123
                <InvoicesTable />
            </div>
        </AppLayout>
    );
};

export default InvoicePage;
