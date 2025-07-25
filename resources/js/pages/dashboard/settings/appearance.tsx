import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/default/appearance-tabs';
import HeadingSmall from '@/components/default/heading-small';
import { type BreadcrumbItem } from '@/lib/types';

import { LocaleSelectInput } from '@/components/dashboard/settings/locale-select-input';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: 'dashboard/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="flex flex-col items-start space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                    <LocaleSelectInput />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
