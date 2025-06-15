import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { TypedFieldPath } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldType = string;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    className?: React.HTMLAttributes<'div'>['className'];
    buttonClassName?: React.HTMLAttributes<'button'>['className'];
    selectOptions: { label: string; value: string }[];
    label: string;
};

export const SelectField = <T extends FieldValues>({ form, className, selectOptions, label, name: propsName, buttonClassName }: Props<T>) => {
    const name = propsName as string;
    const { control } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('hover:bg-accent z-10 h-[60px] w-full min-w-[100px] rounded', className)}>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className={cn('relative h-full cursor-pointer rounded', buttonClassName)}>
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
