import { cn } from '@/lib/utils/cn';

type Props = {
    className?: React.HTMLAttributes<'div'>['className'];
    children: React.ReactNode;
};

export const MainContentLayout = ({ children, className }: Props) => {
    return (
        <div className="mx-auto min-h-full w-full max-w-[1600px] md:mt-6 md:min-h-auto">
            <div className={cn('bg-sidebar h-full p-4 py-6 md:mx-4 md:rounded md:p-6', className)}>{children}</div>
        </div>
    );
};
