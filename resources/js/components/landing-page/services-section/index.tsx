import { Heading } from '@/components/landing-page/common/Heading';
import { BarChart2, Download, FileMinus, FileText, HelpCircle, Send, Shield, Smartphone, UserPlus, Users } from 'lucide-react';
import { ServiceItem } from './service-item';

const services = [
    {
        icon: FileText,
        text: 'Wystawiaj wszystkie typy faktur: VAT, proforma, zaliczkowe, końcowe.',
    },
    {
        icon: Users,
        text: 'Zarządzaj klientami i produktami. Szybkie wyszukiwanie i edycja.',
    },
    {
        icon: BarChart2,
        text: 'Przejrzyste raporty finansowe i automatyczne zestawienia księgowe.',
    },
    {
        icon: FileMinus,
        text: 'Kontroluj koszty, archiwizuj faktury i monitoruj zobowiązania.',
    },
    {
        icon: Download,
        text: 'Drukuj, zapisuj PDF lub archiwizuj faktury w chmurze.',
    },
    {
        icon: Send,
        text: 'Wyślij fakturę e-mailem bezpośrednio z aplikacji.',
    },
    {
        icon: UserPlus,
        text: 'Dostęp dla pracowników z różnymi poziomami uprawnień.',
    },
    {
        icon: Shield,
        text: 'Dane chronione szyfrowaniem i regularnymi kopiami zapasowymi.',
    },
    {
        icon: Smartphone,
        text: 'Korzystaj na komputerze, tablecie lub smartfonie.',
    },
    {
        icon: HelpCircle,
        text: 'Wsparcie techniczne przez czat, e-mail i telefon.',
    },
];

export const ServicesSection = () => {
    return (
        <div className="mx-auto max-w-[1640px] p-4 md:px-8 xl:px-12">
            <Heading title="Our Services" description="Discover the range of professional services we offer to help you achieve your goals." />
            <div className="mt-18 flex flex-wrap justify-center gap-x-4 md:justify-start md:gap-y-8">
                {services.map((service, idx) => (
                    <ServiceItem key={idx} text={service.text} Icon={service.icon} />
                ))}
            </div>
        </div>
    );
};
