import { usePremium } from '@/lib/hooks/use-premium';

export const DisplayPremiumDays = () => {
    const { premiumDays } = usePremium();

    return (
        <span className="text-orange-400">
            {premiumDays} {premiumDays === 1 ? 'day' : 'days'}
        </span>
    );
};
