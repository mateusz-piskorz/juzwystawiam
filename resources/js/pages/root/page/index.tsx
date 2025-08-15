import { RootLayout } from '@/layouts/root/root-layout';
import { SectionHero } from './partials/section-hero';

export default function Welcome() {
    return (
        <RootLayout>
            <SectionHero />
            {/* <SectionCoverImage className="mt-30" /> */}
            {/* <SectionAboutUs /> */}
            {/* <SectionServices /> */}
            {/* <SectionPricing /> */}
            {/* <SectionContact /> */}
        </RootLayout>
    );
}
