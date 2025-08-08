import { RootHeading } from '@/components/common/root-heading';
import { useLocale } from '@/lib/hooks/use-locale';
import { PricingItem } from './pricing-item';

const pricingPlans = [
    {
        name: { en: 'Basic', pl: 'Podstawowy' },
        price: 0,
        forever: true,
        features: [
            { en: '10 invoices', pl: '10 faktur' },
            { en: '10 emails issuing', pl: '10 wysłanych faktur' },
            { en: 'Unlimited products', pl: 'Nielimitowane produkty' },
            { en: 'Unlimited contractors', pl: 'Nielimitowani kontrahenci' },
            { en: 'Export to PDF', pl: 'Eksport do PDF' },
        ],
    },
    {
        name: { en: 'Premium', pl: 'Premium' },
        price: 29,
        features: [
            { en: 'Unlimited invoices', pl: 'Nielimitowane faktury' },
            { en: 'Unlimited emails issuing', pl: 'Nielimitowane wysyłki faktur' },
            { en: 'Unlimited products', pl: 'Nielimitowane produkty', grayed: true },
            { en: 'Unlimited contractors', pl: 'Nielimitowani kontrahenci', grayed: true },
            { en: 'Export to PDF', pl: 'Eksport do PDF', grayed: true },
            { en: 'Basic support', pl: 'Podstawowe wsparcie' },
            { en: 'Advanced analytics', pl: 'Zaawansowana analityka' },
        ],
    },
    {
        name: { en: 'Premium Plus', pl: 'Premium Plus' },
        price: 89,
        features: [
            { en: 'Unlimited invoices', pl: 'Nielimitowane faktury', grayed: true },
            { en: 'Unlimited emails issuing', pl: 'Nielimitowane wysyłki faktur', grayed: true },
            { en: 'Unlimited products', pl: 'Nielimitowane produkty', grayed: true },
            { en: 'Unlimited contractors', pl: 'Nielimitowani kontrahenci', grayed: true },
            { en: 'Export to PDF', pl: 'Eksport do PDF', grayed: true },
            { en: 'Priority support', pl: 'Priorytetowe wsparcie' },
            { en: 'Advanced analytics', pl: 'Zaawansowana analityka', grayed: true },
            { en: 'Custom branding', pl: 'Personalizacja marki' },
            { en: 'Team collaboration', pl: 'Współpraca zespołowa' },
            { en: 'API access', pl: 'Dostęp do API' },
            { en: 'White-label solutions', pl: 'Rozwiązania white-label' },
        ],
    },
];

export const SectionPricing = () => {
    const locale = useLocale().locale.root;
    return (
        <section className="mx-auto max-w-[1640px] p-4 md:px-8 xl:px-12">
            <RootHeading
                title={locale.Pricing}
                description={locale['Explore our transparent pricing options and find a plan that fits your needs and budget']}
            />
            <div className="mt-18 flex flex-col items-center gap-4 gap-y-8 md:flex-row md:items-stretch xl:gap-14">
                {pricingPlans.map((plan, idx) => (
                    <PricingItem key={idx} {...plan} />
                ))}
            </div>
        </section>
    );
};
