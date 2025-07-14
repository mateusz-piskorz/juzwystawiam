import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MainContentLayout } from '@/layouts/main-content-layout';
import { getDev1 } from '@/lib/data/dev';
import { BreadcrumbItem } from '@/lib/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Dev',
        href: '/dashboard/dev',
    },
];

const DevPage = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="dev" />
            <MainContentLayout>
                <h1 className="mb-5 text-xl">De</h1>
                <Button onClick={() => getDev1()}>dev1</Button>
            </MainContentLayout>
        </AppLayout>
    );
};

export default DevPage;
