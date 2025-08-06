import { Button } from '@/components/ui/button';
import { usePage } from '@/lib/hooks/use-page';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { BrandLogosHorizontal } from './brand-logos-horizontal';

export const SectionHero = () => {
    const { auth } = usePage().props;
    return (
        <section className="mx-auto max-w-[1640px] space-y-40 p-4 md:px-8 xl:px-12">
            <div className="items-end justify-between space-y-8 text-center md:text-left xl:flex xl:space-y-0">
                <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
                    <h1 className="-mb-[10px] max-w-[500px] text-2xl leading-[1.3] font-semibold md:max-w-[650px] md:text-4xl lg:max-w-[950px] lg:text-[56px]">
                        Effortless payment management and intuitive invoicing
                    </h1>
                    <p className="text-muted-foreground max-w-[800px] text-sm md:text-base lg:max-w-[1000px] lg:text-xl">
                        Simplify invoicing, track payments, and manage clients with ease. Automate tasks, create professional invoices in seconds, and
                        get real-time financial insights. Perfect for freelancers and small businesses to stay organized and get paid faster
                    </p>
                </div>
                <Button variant="secondary" className="xl:px-4 xl:py-5 xl:text-lg">
                    <Link href={route(auth.user ? 'dashboard' : 'login')} className="flex items-center gap-2 xl:gap-4">
                        Start Now
                        <ChevronRight />
                    </Link>
                </Button>
            </div>
            <BrandLogosHorizontal />
        </section>
    );
};
