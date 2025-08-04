import { AboutUsSection } from '@/components/landing-page/about-us-section';
import { ContactSection } from '@/components/landing-page/contact-section';
import { CoverImageSection } from '@/components/landing-page/cover-image-section';
import { Footer } from '@/components/landing-page/footer';
import { Header } from '@/components/landing-page/header';
import { HeroSection } from '@/components/landing-page/hero-section';
import { PricingSection } from '@/components/landing-page/pricing-section';
import { ServicesSection } from '@/components/landing-page/services-section';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="space-y-20">
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..600&display=swap" rel="stylesheet" />
            </Head>

            <Header />
            <HeroSection />
            <CoverImageSection className="mt-30" />
            <AboutUsSection />
            <ServicesSection />
            <PricingSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
