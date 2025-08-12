import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Nullable } from '@/lib/types/nullable';
import { TypedFieldPath } from '@/lib/types/typed-field-path';
import { cn } from '@/lib/utils/cn';

import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldType = Nullable<string>;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    className?: React.HTMLAttributes<'div'>['className'];
    selectOptions: { label: string; value: string }[];
    label: string;
};

export const SelectField = <T extends FieldValues>({ form, className, selectOptions, label, name: propsName }: Props<T>) => {
    const name = propsName as string;
    const { control } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        'hover:bg-accent z-10 h-[60px] w-full min-w-[100px] rounded border',
                        'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
                        className,
                    )}
                >
                    {/* todo: use Select component from components/common */}
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                        <FormControl>
                            <SelectTrigger className={cn('border-sidebar-ring relative h-full cursor-pointer rounded-none border-none')}>
                                <span className="invisible" />
                                <div className="absolute flex w-[calc(100%-40px)] flex-col gap-1">
                                    <FormLabel className={cn('text-muted-foreground w-full truncate text-left', field.value && 'text-xs')}>
                                        {label}
                                    </FormLabel>
                                    {field.value && (
                                        <span className="w-full truncate text-left">
                                            {selectOptions.find(({ value }) => value === field.value)?.label}
                                        </span>
                                    )}
                                </div>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectOptions.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
};
