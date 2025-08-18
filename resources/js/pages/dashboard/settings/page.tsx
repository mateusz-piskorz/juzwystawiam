import type { BreadcrumbItem } from '@/lib/types';

import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/dashboard/app-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head } from '@inertiajs/react';
import { SectionAppearance } from './partials/section-appearance';
import { SectionDeleteUser } from './partials/section-delete-user';
import { SectionPassword } from './partials/section-password';
import { SectionProfileSettings } from './partials/section-profile-settings';

const SettingsPage = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'], common: l.common };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: locale.common.Dashboard,
            href: route('dashboard'),
        },
        {
            title: locale.index['Settings'],
            href: route('settings'),
        },
    ];

    return (
        // todo: add logout button if missing
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={locale.index['Settings']} />
            <div className="space-y-8 py-8">
                <SectionAppearance />
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
