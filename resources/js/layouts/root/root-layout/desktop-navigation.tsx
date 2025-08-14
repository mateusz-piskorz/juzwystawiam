import { AppearanceToggle } from '@/components/common/appearance-toggle';
import { LocaleSelectInput } from '@/components/common/locale-select-input';

import { Button } from '@/components/ui/button';
import { NAV_LIST } from '@/lib/constants/nav-list';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { Link } from '@inertiajs/react';

export const DesktopNavigation = () => {
    const { auth } = usePage().props;
    const { locale } = useLocale();

    return (
        <div className="flex gap-8">
            <nav>
                <ul className="flex list-none flex-row items-center gap-8">
                    {NAV_LIST.map((item) => (
                        <li className="cursor-pointer" key={item.label}>
                            <Link href={item.href}>{locale.enum.NAV_LIST[item.label]}</Link>
                        </li>
                    ))}
                    <li>
                        {/* todo: we can extract this also from mobile-navigation to separate component */}
                        <Button variant="accent">
                            {auth.user ? (
                                <Link href={route('dashboard')}>{locale.common.Dashboard}</Link>
                            ) : (
                                <Link href={route('login')}>{locale.root['Log in']}</Link>
                            )}
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="space-x-4">
                <AppearanceToggle variant="icon" align="end" />
                <LocaleSelectInput variant="icon" align="end" />
            </div>
        </div>
    );
};
