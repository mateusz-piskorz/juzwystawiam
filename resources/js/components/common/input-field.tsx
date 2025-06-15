import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { TypedFieldPath } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/input';

type FieldType = string | number | undefined;
type InputType = 'text' | 'number';

type Props<T extends FieldValues, IT extends InputType> = {
    type?: IT;
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, IT extends 'number' ? number | undefined : string | undefined>;
    label: string;
    inputMode?: InputHTMLAttributes<''>['inputMode'];
};

export const InputField = <T extends FieldValues, IT extends InputType>({ form, label, name: propsName, type, inputMode }: Props<T, IT>) => {
    const name = propsName as string;
    const { control } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="hover:bg-accent relative z-10 block h-[60px] min-w-[100px] rounded">
                    <FormLabel
                        className={cn('text-muted-foreground', 'absolute top-1/2 left-3 -translate-y-1/2', field.value && 'top-[18px] text-xs')}
                    >
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            value={field.value || ''}
                            className={cn('h-full', field.value && 'pt-5')}
                            type={type}
                            inputMode={inputMode}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
