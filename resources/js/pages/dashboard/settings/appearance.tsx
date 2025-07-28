import { type BreadcrumbItem } from '@/lib/types';

import { Heading } from '@/components/common/heading';
import { AppearanceTabs } from '@/components/dashboard/settings/appearance/appearance-tabs';
import { LocaleSelectInput } from '@/components/dashboard/settings/appearance/locale-select-input';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { SettingsLayout } from '@/layouts/dashboard/settings';
import { usePage } from '@/lib/hooks/use-page';
import { Head } from '@inertiajs/react';

export default function Appearance() {
    const l = usePage().props.locale.data;
    const locale = { ...l['dashboard/settings'].appearance, common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale['Appearance settings'],
            href: '/dashboard/settings/appearance',
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
