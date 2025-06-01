import { CreateContractor } from '@/components/dev/createContractor';
import { GetContractorsButton } from '@/components/dev/getContractorsButton';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const DevPage = () => {
    return (
        <AppLayout>
            <Head title="Dev" />
            <div className="flex flex-col gap-4">
                <GetContractorsButton />
                <CreateContractor />
            </div>
        </AppLayout>
    );
};

export default DevPage;
