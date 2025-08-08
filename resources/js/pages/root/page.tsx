import { SectionAboutUs } from '@/features/section-about-us';
import { SectionContact } from '@/features/section-contact';
import { SectionCoverImage } from '@/features/section-cover-image';
import { SectionHero } from '@/features/section-hero';
import { SectionPricing } from '@/features/section-pricing';
import { SectionServices } from '@/features/section-services';
import { RootLayout } from '@/layouts/root/root-layout';

export default function Welcome() {
    return (
        <RootLayout>
            <SectionHero />
            <SectionCoverImage className="mt-30" />
            <SectionAboutUs />
            <SectionServices />
            <SectionPricing />
            <SectionContact />
        </RootLayout>
    );
}
