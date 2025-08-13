import { useLocale } from '@/lib/hooks/use-locale';
import { CardBuyPremium } from './card-buy-premium';

export const SectionBuyPremium = () => {
    const locale = useLocale().locale['dashboard/premium-account'];
    return (
        <div className="flex flex-col">
            <h1 className="mb-2 text-xl font-medium">{locale['Buy Premium Days']}</h1>
            <p className="text-muted-foreground mb-8">{locale['Choose a plan that suits you and continue enjoying premium benefits!']}</p>
            <div className="flex flex-col gap-6 max-sm:w-full sm:flex-row">
                <CardBuyPremium days={1} />
                <CardBuyPremium days={7} />
                <CardBuyPremium days={30} />
            </div>
        </div>
    );
};
