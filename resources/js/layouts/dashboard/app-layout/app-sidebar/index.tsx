import { AppLogo } from '@/components/common/app-logo';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLocale } from '@/lib/hooks/use-locale';
import { type NavItem } from '@/lib/types';
import { Link } from '@inertiajs/react';
import { AirVentIcon, ChartNoAxesCombined, Crown, LayoutGrid, RadioReceiver, Users2 } from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export function AppSidebar() {
    const locale = useLocale().locale.common.sidebar;
    const mainNavItems: NavItem[] = [
        {
            title: locale.Dashboard,
            href: route('dashboard'),
            icon: LayoutGrid,
        },
        {
            title: locale.Invoices,
            href: route('invoices'),
            icon: RadioReceiver,
        },
        {
            title: locale.Contractors,
            href: route('contractors'),
            icon: Users2,
        },
        {
            title: locale.Products,
            href: route('products'),
            icon: AirVentIcon,
        },
        {
            title: locale['Expense Types'],
            href: route('expense-types'),
            icon: AirVentIcon,
        },
        {
            title: locale.Analytics,
            href: route('analytics'),
            icon: ChartNoAxesCombined,
        },
        {
            title: locale['Premium Account'],
            href: route('premium-account'),
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
            {/* todo: here we should display button for settings and profile next to it */}
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
