import { PremiumStatusHeading } from '@/components/common/premium-status-heading';
import { SectionBenefits } from './section-benefits';
import { SectionBuyPremium } from './section-buy-premium';

export const SectionDashboardPremiumAccount = () => {
    return (
        <div className="md:bg-sidebar space-y-12 md:space-y-8 md:rounded md:p-6">
            <PremiumStatusHeading />
            <SectionBenefits />
            <SectionBuyPremium />
        </div>
    );
};
