import { cn } from '@/lib/utils/cn';

type Props = {
    title: string;
    description?: string | React.ReactNode;
    size?: 'small' | 'normal' | 'big';
    className?: string;
};

// todo: (we don't need size big)

export function DashboardHeading({ title, description, size = 'normal', className }: Props) {
    return (
        <div className={cn('mb-5 space-y-0.5', size === 'big' && 'lg:space-y-2', className)}>
            <h1 className={cn('text-xl font-semibold', size === 'small' && 'text-lg', size === 'big' && 'text-2xl lg:text-4xl')}>{title}</h1>
            {description &&
                (typeof description === 'string' ? (
                    <p className={cn('text-muted-foreground text-sm', size === 'big' && 'lg:text-base')}>{description}</p>
                ) : (
                    description
                ))}
        </div>
    );
}
