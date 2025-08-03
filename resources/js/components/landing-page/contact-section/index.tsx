import { Heading } from '../common/Heading';
import { ContactForm } from './contact-form';
import { ContactUsDirectly } from './contact-us-directly';

export const ContactSection = () => {
    return (
        <section className="mx-auto max-w-[1640px] space-y-14 p-4 md:px-8 xl:px-12">
            <Heading title="Contact Us" description="Have a question or need support? Contact us and our team will be happy to help!" />

            <ContactUsDirectly />
            <ContactForm />
        </section>
    );
};
