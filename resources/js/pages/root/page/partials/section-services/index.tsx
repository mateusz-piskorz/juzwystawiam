import { RootHeading } from '@/components/common/root-heading';
import { useLocale } from '@/lib/hooks/use-locale';
import { BarChart2, Download, FileMinus, FileText, HelpCircle, Send, Shield, Smartphone, UserPlus, Users } from 'lucide-react';
import { ServiceItem } from './service-item';

const services = [
    {
        icon: FileText,
        text: 'Issue all types of invoices: VAT, proforma, advance, final.',
    },
    {
        icon: Users,
        text: 'Manage clients and products. Fast search and editing.',
    },
    {
        icon: BarChart2,
        text: 'Clear financial reports and automatic accounting summaries.',
    },
    {
        icon: FileMinus,
        text: 'Control costs, archive invoices, and monitor liabilities.',
    },
    {
        icon: Download,
        text: 'Print, save as PDF, or archive invoices in the cloud.',
    },
    {
        icon: Send,
        text: 'Send invoices by email directly from the app.',
    },
    {
        icon: UserPlus,
        text: 'Access for employees with different permission levels.',
    },
    {
        icon: Shield,
        text: 'Data protected by encryption and regular backups.',
    },
    {
        icon: Smartphone,
        text: 'Use on computer, tablet, or smartphone.',
    },
    {
        icon: HelpCircle,
        text: 'Technical support via chat, email, and phone.',
    },
] as const;

export const SectionServices = () => {
    const { locale } = useLocale();

    return (
        <section className="mx-auto max-w-[1640px] p-4 md:px-8 xl:px-12" id="services">
            <RootHeading
                title={locale.root['Our Services']}
                description={locale.root['Discover the range of professional services we offer to help you achieve your goals']}
            />
            <div className="mt-18 flex flex-wrap justify-center gap-x-4 md:justify-start md:gap-y-8">
                {services.map((service, idx) => (
                    <ServiceItem key={idx} text={locale.root.services[service.text]} Icon={service.icon} />
                ))}
            </div>
        </section>
    );
};
