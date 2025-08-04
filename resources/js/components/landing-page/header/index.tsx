import { useIsMobile } from '@/lib/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import { AppLogo } from '../../common/app-logo';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';

export const Header = () => {
    const isMobile = useIsMobile();
    return (
        <header className="mx-auto flex max-w-[1640px] items-center justify-between p-4 md:p-8">
            <Link href="#" className="flex items-center gap-4">
                <AppLogo className="" textClassName="hidden max-md:block lg:block" />
            </Link>
            {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
        </header>
    );
};
