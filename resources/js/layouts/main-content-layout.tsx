import { cn } from '@/lib/utils/cn';

type Props = {
    className?: React.HTMLAttributes<'div'>['className'];
    children: React.ReactNode;
    headerText?: string;
};

export const MainContentLayout = ({ children, className, headerText }: Props) => {
    return (
        <div className="mx-auto min-h-full w-full max-w-[1600px] md:mt-6 md:min-h-auto">
            <div className={cn('bg-sidebar h-full p-4 md:mx-4 md:rounded-md', className)}>
                <h1 className="text-lg">{headerText}</h1>
                {children}
            </div>
        </div>
    );
};
