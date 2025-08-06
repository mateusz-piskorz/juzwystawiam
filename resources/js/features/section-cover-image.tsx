import { cn } from '@/lib/utils/cn';
import overlay from '../../../public/overlays/overlay1.jpg';

type Props = {
    className?: string;
};

export const SectionCoverImage = ({ className }: Props) => {
    return (
        <section
            style={{
                backgroundImage: `url(${overlay})`,
            }}
            className={cn('relative aspect-[20/10] min-h-[350px] w-full bg-cover bg-center bg-no-repeat', className)}
        >
            <div
                className={cn(
                    'absolute h-full w-full',
                    'dark:bg-[linear-gradient(to_bottom,_#0A0A0A,_rgba(10,10,10,.12)_35%,_rgba(10,10,10,.28)_75%,_rgba(10,10,10,.66))]',
                    'bg-[linear-gradient(to_bottom,_#f3f3f6,_rgba(243,243,246,.01)_15%,_rgba(243,243,246,.08)_75%,_rgba(243,243,246,.56))]',
                )}
            >
                <p
                    className={cn(
                        'absolute bottom-[10%] left-[5%] font-bold italic md:left-[10%] dark:text-shadow-lg',
                        'dark:text-foreground max-w-[450px] pr-10 text-[clamp(1.1rem,2.5vw,2.5vw)] text-zinc-900 sm:max-w-[55vw] md:pr-0',
                    )}
                >
                    - Create, send, and track invoices in one place. Stay organized, manage clients, and get paid faster with our all-in-one invoicing
                    system. Simplify your workflow, reduce paperwork, and focus on growing your business
                </p>
            </div>
        </section>
    );
};
