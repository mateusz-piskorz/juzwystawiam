import { AppearanceToggle } from '@/components/common/appearance-toggle';
import { LocaleSelectInput } from '@/components/dashboard/settings/appearance/locale-select-input';
import { Button } from '@/components/ui/button';
import { NAV_LIST } from '@/lib/constants/nav-list';
import { usePage } from '@/lib/hooks/use-page';
import { Link } from '@inertiajs/react';

export const DesktopNavigation = () => {
    const { auth } = usePage().props;

    return (
        <div className="flex gap-8">
            <nav>
                <ul className="flex list-none flex-row items-center gap-8">
                    {NAV_LIST.map((item) => (
                        <li className="cursor-pointer" key={item.label}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                    <li>
                        <Button variant="secondary">
                            {auth.user ? <Link href={route('dashboard')}>Dashboard</Link> : <Link href={route('login')}>Log in</Link>}
                        </Button>
                    </li>
                </ul>
            </nav>
            <AppearanceToggle variant="icon" align="end" />
            <LocaleSelectInput variant="icon" align="end" />
        </div>
    );
};
