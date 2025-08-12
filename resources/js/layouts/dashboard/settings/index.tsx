import { DashboardHeading } from '@/components/common/dashboard-heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLocale } from '@/lib/hooks/use-locale';
import { type NavItem } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export function SettingsLayout({ children }: PropsWithChildren) {
    const locale = useLocale().locale['dashboard/settings'].index;

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const sidebarNavItems: NavItem[] = [
        {
            title: locale.Profile,
            href: '/dashboard/settings/profile',
            icon: null,
        },
        {
            title: locale.Password,
            href: '/dashboard/settings/password',
            icon: null,
        },
        {
            title: locale.Appearance,
            href: '/dashboard/settings/appearance',
            icon: null,
        },
    ];

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-8 md:px-8">
            <DashboardHeading title={locale.Settings} description={locale['Manage your profile and account settings']} className="mb-8" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
