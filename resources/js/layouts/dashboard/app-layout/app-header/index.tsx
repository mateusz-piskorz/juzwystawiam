import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/lib/types';
import { Breadcrumbs } from './breadcrumbs';

type Props = { breadcrumbs?: BreadcrumbItemType[] };

export function AppHeader({ breadcrumbs = [] }: Props) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
