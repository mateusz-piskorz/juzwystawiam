import { Heading } from '@/components/landing-page/common/Heading';
import { PricingItem } from './pricing-item';

const pricingPlans = [
    {
        name: 'Basic',
        price: 0,
        forever: true,
        features: ['10 invoices', '10 emails issuing', 'Unlimited products', 'Unlimited contractors', 'Export to PDF'],
    },
    {
        name: 'Premium',
        price: 29,
        features: [
            'Unlimited invoices',
            'Unlimited emails issuing',
            { grayed: 'Unlimited products' },
            { grayed: 'Unlimited contractors' },
            { grayed: 'Export to PDF' },
            'Basic support',
            'Advanced analytics',
        ],
    },
    {
        name: 'Premium Plus',
        price: 89,
        features: [
            { grayed: 'Unlimited invoices' },
            { grayed: 'Unlimited emails issuing' },
            { grayed: 'Unlimited products' },
            { grayed: 'Unlimited contractors' },
            { grayed: 'Export to PDF' },
            'Priority support',
            { grayed: 'Advanced analytics' },
            'Custom branding',
            'Team collaboration',
            'API access',
            'White-label solutions',
        ],
    },
];

export const PricingSection = () => {
    return (
        <section className="mx-auto max-w-[1640px] p-4 md:px-8 xl:px-12">
            <Heading title="Pricing" description="Explore our transparent pricing options and find a plan that fits your needs and budget." />
            <div className="mt-18 flex flex-col items-center gap-4 gap-y-8 md:flex-row md:items-stretch xl:gap-14">
                {pricingPlans.map((plan, idx) => (
                    <PricingItem key={idx} {...plan} />
                ))}
            </div>
        </section>
    );
};
