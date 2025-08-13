import { PremiumStatusHeading } from '@/components/common/premium-status-heading';

import { Separator } from '@/components/ui/separator';
import { SectionBenefits } from './section-benefits';
import { SectionBuyPremium } from './section-buy-premium';

export const SectionDashboardPremiumAccount = () => {
    return (
        <>
            <div className="px-4 md:space-y-8 md:rounded md:px-8">
                <PremiumStatusHeading />
                <SectionBenefits />
            </div>
            <Separator orientation="horizontal" />
            <div className="px-4 md:space-y-8 md:rounded md:px-8">
                <SectionBuyPremium />
            </div>
        </>
    );
};
