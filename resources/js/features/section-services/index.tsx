import { RootHeading } from '@/components/common/root-heading';
import { useLocale } from '@/lib/hooks/use-locale';
import { BarChart2, Download, FileMinus, FileText, HelpCircle, Send, Shield, Smartphone, UserPlus, Users } from 'lucide-react';
import { ServiceItem } from './service-item';

const services = [
    {
        icon: FileText,
        text: {
            pl: 'Wystawiaj wszystkie typy faktur: VAT, proforma, zaliczkowe, końcowe.',
            en: 'Issue all types of invoices: VAT, proforma, advance, final.',
        },
    },
    {
        icon: Users,
        text: {
            pl: 'Zarządzaj klientami i produktami. Szybkie wyszukiwanie i edycja.',
            en: 'Manage clients and products. Fast search and editing.',
        },
    },
    {
        icon: BarChart2,
        text: {
            pl: 'Przejrzyste raporty finansowe i automatyczne zestawienia księgowe.',
            en: 'Clear financial reports and automatic accounting summaries.',
        },
    },
    {
        icon: FileMinus,
        text: {
            pl: 'Kontroluj koszty, archiwizuj faktury i monitoruj zobowiązania.',
            en: 'Control costs, archive invoices, and monitor liabilities.',
        },
    },
    {
        icon: Download,
        text: {
            pl: 'Drukuj, zapisuj PDF lub archiwizuj faktury w chmurze.',
            en: 'Print, save as PDF, or archive invoices in the cloud.',
        },
    },
    {
        icon: Send,
        text: {
            pl: 'Wyślij fakturę e-mailem bezpośrednio z aplikacji.',
            en: 'Send invoices by email directly from the app.',
        },
    },
    {
        icon: UserPlus,
        text: {
            pl: 'Dostęp dla pracowników z różnymi poziomami uprawnień.',
            en: 'Access for employees with different permission levels.',
        },
    },
    {
        icon: Shield,
        text: {
            pl: 'Dane chronione szyfrowaniem i regularnymi kopiami zapasowymi.',
            en: 'Data protected by encryption and regular backups.',
        },
    },
    {
        icon: Smartphone,
        text: {
            pl: 'Korzystaj na komputerze, tablecie lub smartfonie.',
            en: 'Use on computer, tablet, or smartphone.',
        },
    },
    {
        icon: HelpCircle,
        text: {
            pl: 'Wsparcie techniczne przez czat, e-mail i telefon.',
            en: 'Technical support via chat, email, and phone.',
        },
    },
];

export const SectionServices = () => {
    const { languageCode, locale } = useLocale();

    return (
        <section className="mx-auto max-w-[1640px] p-4 md:px-8 xl:px-12" id="services">
            <RootHeading
                title={locale.root['Our Services']}
                description={locale.root['Discover the range of professional services we offer to help you achieve your goals']}
            />
            <div className="mt-18 flex flex-wrap justify-center gap-x-4 md:justify-start md:gap-y-8">
                {services.map((service, idx) => (
                    <ServiceItem key={idx} text={service.text[languageCode]} Icon={service.icon} />
                ))}
            </div>
        </section>
    );
};
