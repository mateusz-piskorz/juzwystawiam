import { type BreadcrumbItem } from '@/lib/types';

import { AppearanceToggle } from '@/components/common/appearance-toggle';
import { Heading } from '@/components/common/heading';
import { LocaleSelectInput } from '@/components/dashboard/settings/appearance/locale-select-input';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { SettingsLayout } from '@/layouts/dashboard/settings';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

export default function Appearance() {
    const l = useLocale().locale;
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
                    <div>
                        <h4 className="mb-2">{locale.Theme}</h4>
                        <AppearanceToggle />
                    </div>
                    <div>
                        <h4 className="mb-2">{locale.Language}</h4>
                        <LocaleSelectInput />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
