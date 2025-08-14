import { RootLayout } from '@/layouts/root/root-layout';
import { SectionAboutUs } from '@/pages/root/page/partials/section-about-us';
import { SectionContact } from './partials/section-contact';
import { SectionCoverImage } from './partials/section-cover-image';
import { SectionHero } from './partials/section-hero';
import { SectionPricing } from './partials/section-pricing';
import { SectionServices } from './partials/section-services';

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
