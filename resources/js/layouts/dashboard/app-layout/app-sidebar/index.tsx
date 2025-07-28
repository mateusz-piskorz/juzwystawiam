import { AppLogo } from '@/components/common/app-logo';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLocale } from '@/lib/hooks/use-locale';
import { type NavItem } from '@/lib/types';
import { Link } from '@inertiajs/react';
import { AirVentIcon, ChartNoAxesCombined, Crown, LayoutGrid, RadioReceiver, Users2 } from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export function AppSidebar() {
    const locale = useLocale().locale.data.common.sidebar;
    const mainNavItems: NavItem[] = [
        {
            title: locale.Dashboard,
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: locale.Invoices,
            href: '/dashboard/invoices',
            icon: RadioReceiver,
        },
        {
            title: locale.Contractors,
            href: '/dashboard/contractors',
            icon: Users2,
        },
        {
            title: locale.Products,
            href: '/dashboard/products',
            icon: AirVentIcon,
        },
        {
            title: locale.Analytics,
            href: '/dashboard/analytics',
            icon: ChartNoAxesCombined,
        },
        {
            title: locale['Premium Account'],
            href: '/dashboard/premium-account',
            icon: Crown,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
