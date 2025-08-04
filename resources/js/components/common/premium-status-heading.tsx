import { useLocale } from '@/lib/hooks/use-locale';
import { usePremium } from '@/lib/hooks/use-premium';
import { DashboardHeading } from './dashboard-heading';

export const PremiumStatusHeading = () => {
    const { hasPremium, premiumDays } = usePremium();
    const locale = useLocale().locale.common['premium-status-heading'];

    return (
        <DashboardHeading
            title={locale['Premium Status']}
            description={
                <p className="text-muted-foreground">
                    {locale['Your premium account is']} {hasPremium ? locale.active : locale.inactive}. {locale['Days left']}{' '}
                    <span className="text-orange-400">{premiumDays}</span>
                </p>
            }
        />
    );
};
