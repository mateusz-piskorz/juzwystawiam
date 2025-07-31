import { cn } from '@/lib/utils/cn';

type Props = {
    title: string;
    description?: string | React.ReactNode;
    size?: 'small' | 'normal';
    className?: string;
};

export function Heading({ title, description, size = 'normal', className }: Props) {
    return (
        <div className={cn('mb-5 space-y-0.5', className)}>
            {size === 'small' ? (
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            ) : (
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            )}
            {description && (typeof description === 'string' ? <p className="text-muted-foreground text-sm">{description}</p> : description)}
        </div>
    );
}
