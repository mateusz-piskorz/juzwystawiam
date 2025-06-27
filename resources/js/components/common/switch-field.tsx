import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { TypedFieldPath } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Switch } from '../ui/switch';

type FieldType = boolean;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    label: string;
    className?: React.HTMLAttributes<'div'>['className'];
    description: string;
    resetBorder?: boolean;
};

export const SwitchField = <T extends FieldValues>({ form, label, name: propsName, description, className, resetBorder }: Props<T>) => {
    const name = propsName as string;
    const { control } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('group hover:bg-accent', resetBorder && 'rounded-none', className)}>
                    <div
                        className={cn(
                            'relative flex h-[60px] flex-row items-center justify-between rounded border p-3',
                            'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
                            resetBorder && 'rounded-none border-none',
                            className,
                        )}
                    >
                        <span className="invisible" />
                        <div className="absolute w-[calc(100%-55px)]">
                            <FormLabel className="block cursor-pointer truncate text-sm font-normal">{label}</FormLabel>
                            <FormDescription className="truncate">{description}</FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                className="dark:group-hover:data-[state=unchecked]:bg-background w-[32px] cursor-pointer focus-visible:ring-0"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    );
};
