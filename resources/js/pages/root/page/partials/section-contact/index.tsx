import { RootHeading } from '@/components/common/root-heading';
import { useLocale } from '@/lib/hooks/use-locale';
import { ContactForm } from './contact-form';
import { ContactUsDirectly } from './contact-us-directly';

export const SectionContact = () => {
    const locale = useLocale().locale.root;
    return (
        <section className="mx-auto max-w-[1640px] space-y-14 p-4 md:px-8 xl:px-12" id="contact">
            <RootHeading
                title={locale['Contact Us']}
                description={locale['Have a question or need support? Contact us and our team will be happy to help!']}
            />
            <ContactUsDirectly />
            <ContactForm />
        </section>
    );
};
