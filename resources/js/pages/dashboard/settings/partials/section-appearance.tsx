import { AppearanceToggle } from '@/components/common/appearance-toggle';
import { DashboardHeading } from '@/components/common/dashboard-heading';
import { LocaleSelectInput } from '@/components/common/locale-select-input';
import { useLocale } from '@/lib/hooks/use-locale';

export const SectionAppearance = () => {
    const locale = useLocale().locale['dashboard/settings'].appearance;
    return (
        <div className="space-y-8 px-4 md:px-8">
            <DashboardHeading
                className="mb-8"
                title={locale['Appearance settings']}
                description={locale["Update your account's appearance settings"]}
            />
            <div className="flex gap-8">
                <div>
                    <h4 className="mb-2">{locale.Theme}</h4>
                    <AppearanceToggle />
                </div>
                <div>
                    <h4 className="mb-2">{locale.Language}</h4>
                    <LocaleSelectInput />
                </div>
            </div>
        </div>
    );
};
