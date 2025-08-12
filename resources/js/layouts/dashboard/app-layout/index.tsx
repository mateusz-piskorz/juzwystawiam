import { type BreadcrumbItem } from '@/lib/types';
import { type ReactNode } from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@/lib/hooks/use-page';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export const AppLayout = ({ children, breadcrumbs }: AppLayoutProps) => {
    const isOpen = usePage().props.sidebarOpen;

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar />

            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} />
                <Separator />

                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};
