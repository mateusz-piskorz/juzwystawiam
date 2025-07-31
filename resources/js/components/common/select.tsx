import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select as UISelect } from '@/components/ui/select';
import { cn } from '@/lib/utils/cn';

type Props<T extends string> = {
    options: { label: string; value: T }[];
    onValueChange: (value: T) => void;
    defaultValue: string;
    placeholder?: string;
    className?: React.HTMLAttributes<'button'>['className'];
    label?: string;
};

export const Select = <T extends string>({ options, placeholder, className, onValueChange, label, defaultValue }: Props<T>) => {
    return (
        <UISelect onValueChange={onValueChange} defaultValue={defaultValue}>
            <SelectTrigger className={cn('w-[180px] rounded', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded">
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </UISelect>
    );
};
