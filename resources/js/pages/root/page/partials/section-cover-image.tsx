import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/utils/cn';
import overlay from '../../../public/overlays/overlay1.jpg';

type Props = {
    className?: string;
};

export const SectionCoverImage = ({ className }: Props) => {
    const locale = useLocale().locale.root;
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
                    'dark:bg-[linear-gradient(to_bottom,_rgba(16,16,18,1),_rgba(16,16,18,.12)_35%,_rgba(16,16,18,.28)_75%,_rgba(16,16,18,.66))]',
                    'bg-[linear-gradient(to_bottom,_rgba(245,245,245,1),_rgba(245,245,245,0.1)_15%,_rgba(245,245,245,0.28)_75%,_rgba(245,245,245,0.56))]',
                )}
            >
                <p
                    className={cn(
                        'absolute bottom-[10%] left-[5%] font-bold italic md:left-[10%] dark:text-shadow-lg',
                        'dark:text-foreground max-w-[450px] pr-10 text-[clamp(1.1rem,2.5vw,2.5vw)] text-zinc-900 sm:max-w-[55vw] md:pr-0',
                    )}
                >
                    -{' '}
                    {
                        locale[
                            'Create, send, and track invoices in one place. Stay organized, manage clients, and get paid faster with our all-in-one invoicing system. Simplify your workflow, reduce paperwork, and focus on growing your business'
                        ]
                    }
                </p>
            </div>
        </section>
    );
};
