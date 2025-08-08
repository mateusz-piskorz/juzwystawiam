import { AppearanceToggle } from '@/components/common/appearance-toggle';
import { LocaleSelectInput } from '@/components/common/locale-select-input';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LIST } from '@/lib/constants/nav-list';
import { usePage } from '@/lib/hooks/use-page';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export const MobileNavigation = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="size-10">
                    <Menu className="size-6" />
                </Button>
            </SheetTrigger>
            <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Displays the mobile navigation.</SheetDescription>
            </SheetHeader>
            <SheetContent side="left" className="max-w-sm px-8 py-12">
                <Navigation closeSidebar={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    );
};

type NavProps = {
    closeSidebar: () => void;
};

const Navigation = ({ closeSidebar }: NavProps) => {
    const { auth } = usePage().props;
    return (
        <div className="space-y-5">
            <nav>
                <ul className="flex list-none flex-col gap-5">
                    {NAV_LIST.map((item) => (
                        <li onClick={closeSidebar} key={item.label} className="flex cursor-pointer items-center gap-4 text-xl">
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
            <div className="flex flex-wrap gap-5">
                <AppearanceToggle />
                <LocaleSelectInput />
            </div>
        </div>
    );
};
