import { RootHeading } from '@/components/common/root-heading';
import { useLocale } from '@/lib/hooks/use-locale';
import { PricingItem } from './pricing-item';

const pricingPlans = [
    {
        name: 'Basic',
        price: 0,
        forever: true,
        features: [
            { text: '10 invoices', grayed: false },
            { text: '10 emails issuing', grayed: false },
            { text: 'Unlimited products', grayed: false },
            { text: 'Unlimited contractors', grayed: false },
            { text: 'Export to PDF', grayed: false },
        ],
    },
    {
        name: 'Premium',
        price: 29,
        features: [
            { text: 'Unlimited invoices', grayed: false },
            { text: 'Unlimited emails issuing', grayed: false },
            { text: 'Unlimited products', grayed: true },
            { text: 'Unlimited contractors', grayed: true },
            { text: 'Export to PDF', grayed: true },
            { text: 'Basic support', grayed: false },
            { text: 'Advanced analytics', grayed: false },
        ],
    },
    {
        name: 'Premium Plus',
        price: 89,
        features: [
            { text: 'Unlimited invoices', grayed: true },
            { text: 'Unlimited emails issuing', grayed: true },
            { text: 'Unlimited products', grayed: true },
            { text: 'Unlimited contractors', grayed: true },
            { text: 'Export to PDF', grayed: true },
            { text: 'Priority support', grayed: false },
            { text: 'Advanced analytics', grayed: true },
            { text: 'Custom branding', grayed: false },
            { text: 'Team collaboration', grayed: false },
            { text: 'API access', grayed: false },
            { text: 'White-label solutions', grayed: false },
        ],
    },
] as const;

export const SectionPricing = () => {
    const locale = useLocale().locale.root;
    const translatedPricingPlans = pricingPlans.map((plan) => {
        const features = plan.features.map((feat) => ({ ...feat, text: locale.pricing.features[feat.text] }));
        return { ...plan, name: locale.pricing[plan.name], features };
    });

    return (
        <section className="mx-auto max-w-[1640px] p-4 md:px-8 xl:px-12" id="pricing">
            <RootHeading
                title={locale.Pricing}
                description={locale['Explore our transparent pricing options and find a plan that fits your needs and budget']}
            />
            <div className="mt-18 flex flex-col items-center gap-4 gap-y-8 md:flex-row md:items-stretch xl:gap-14">
                {translatedPricingPlans.map((plan, idx) => (
                    <PricingItem key={idx} {...plan} />
                ))}
            </div>
        </section>
    );
};
