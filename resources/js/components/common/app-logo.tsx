import { cn } from '@/lib/utils/cn';

type Props = {
    className?: string;
    textClassName?: string;
};

export function AppLogo({ className, textClassName }: Props) {
    return (
        <>
            <div
                className={cn(
                    'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md',
                    className,
                )}
            >
                <svg
                    className="size-5 fill-current text-white dark:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
            </div>
            <div className={cn('ml-1 grid flex-1 text-left', textClassName)}>
                <span className="mb-0.5 truncate leading-none font-semibold">Juz Wystawiam</span>
            </div>
        </>
    );
}
