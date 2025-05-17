import { TodosTable } from '@/components/todos/todos-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Pagination, SharedData, Todo } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

const TodosPage = (props: SharedData & { todos: Pagination<Todo> }) => {
    // console.log(props.todos);
    // const {
    //         props: { todos, ziggy },
    //     } = {props : SharedData & { todos: Pagination<Todo> }}
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="h-full flex-1 rounded-xl p-4">
                here
                <TodosTable />
            </div>
        </AppLayout>
    );
};

export default TodosPage;
