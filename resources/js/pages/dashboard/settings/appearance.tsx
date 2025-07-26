import { Head } from '@inertiajs/react';

import { Heading } from '@/components/common/heading';
import { AppearanceTabs } from '@/components/dashboard/settings/appearance/appearance-tabs';
import { LocaleSelectInput } from '@/components/dashboard/settings/appearance/locale-select-input';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { usePage } from '@/lib/hooks/use-page';
import { type BreadcrumbItem } from '@/lib/types';

export default function Appearance() {
    const locale = usePage().props.localeData.data.dashboard.settings.appearance;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale['Appearance settings'],
            href: 'dashboard/settings/appearance',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale['Appearance settings']} />

            <SettingsLayout>
                <div className="flex flex-col items-start space-y-6">
                    <Heading size="small" title={locale['Appearance settings']} description={locale["Update your account's appearance settings"]} />
                    <AppearanceTabs />
                    <LocaleSelectInput />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
