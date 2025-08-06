import { RootHeading } from '@/components/common/root-heading';
import { ContactForm } from './contact-form';
import { ContactUsDirectly } from './contact-us-directly';

export const SectionContact = () => {
    return (
        <section className="mx-auto max-w-[1640px] space-y-14 p-4 md:px-8 xl:px-12">
            <RootHeading title="Contact Us" description="Have a question or need support? Contact us and our team will be happy to help!" />

            <ContactUsDirectly />
            <ContactForm />
        </section>
    );
};
