import type { BreadcrumbItem } from '@/lib/types';

import { AppearanceToggle } from '@/components/common/appearance-toggle';
import { DashboardHeading } from '@/components/common/dashboard-heading';
import { LocaleSelectInput } from '@/components/common/locale-select-input';
import { Separator } from '@/components/ui/separator';
import { SectionDeleteUser } from '@/features/section-delete-user';
import { SectionPassword } from '@/features/section-password';
import { SectionProfileSettings } from '@/features/section-profile-settings';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';

const SettingsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: '/dashboard',
        },
        {
            title: locale.index['Settings'],
            href: '/dashboard/settings',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.index['Settings']} />
            <div className="space-y-8 py-8">
                <div className="space-y-8 px-4 md:px-8">
                    <DashboardHeading
                        className="mb-8"
                        title={locale.appearance['Appearance settings']}
                        description={locale.appearance["Update your account's appearance settings"]}
                    />
                    <div className="flex gap-8">
                        <div>
                            <h4 className="mb-2">{locale.appearance.Theme}</h4>
                            <AppearanceToggle />
                        </div>
                        <div>
                            <h4 className="mb-2">{locale.appearance.Language}</h4>
                            <LocaleSelectInput />
                        </div>
                    </div>
                </div>
                <Separator orientation="horizontal" />
                <SectionProfileSettings />
                <Separator orientation="horizontal" />
                <SectionPassword />
                <Separator orientation="horizontal" />
                <SectionDeleteUser />
            </div>
        </AppLayout>
    );
};

export default SettingsPage;
