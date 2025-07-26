import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { TypedFieldPath } from '@/lib/types/typed-field-path';
import { cn } from '@/lib/utils/cn';
import { useEffect, useReducer } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from '../../ui/input';

type FieldType = number;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    label: string;
    className?: React.HTMLAttributes<'div'>['className'];
};

const moneyFormatter = Intl.NumberFormat('pl-PL', {
    // currency: 'PLN',
    // currencyDisplay: 'symbol',
    // currencySign: 'standard',
    // style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const CurrencyField = <T extends FieldValues>({ form, label, name: propsName, className }: Props<T>) => {
    const name = propsName as string;
    const { control, getValues, watch } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    const initialValue = getValues(name) ? moneyFormatter.format(getValues(name)) : 0;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [value, setValue] = useReducer((_: any, next: string) => {
        const digits = next.replace(/\D/g, '');
        return moneyFormatter.format(Number(digits) / 100);
    }, initialValue);

    function handleChange(realChangeFn: (val: number) => void, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, '');
        const realValue = Number(digits) / 100;
        realChangeFn(realValue);
    }

    const valueW = watch(name);

    useEffect(() => {
        const watchedValue = valueW;
        if (watchedValue !== undefined && watchedValue !== null) {
            setValue(moneyFormatter.format(Number(watchedValue)));
        } else {
            setValue('');
        }
    }, [valueW]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                field.value = Number(value);
                const _change = field.onChange;
                return (
                    <FormItem
                        className={cn(
                            'hover:bg-accent relative z-10 block h-[60px] w-full min-w-[100px] rounded border',
                            'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
                            className,
                        )}
                    >
                        <FormLabel className={cn('text-muted-foreground', 'absolute top-1/2 left-3 -translate-y-1/2', value && 'top-[18px] text-xs')}>
                            {label}
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                inputMode="numeric"
                                {...field}
                                value={value}
                                onChange={(ev) => {
                                    setValue(ev.target.value);
                                    handleChange(_change, ev.target.value);
                                }}
                                className={cn('h-full border-none', value && 'pt-5')}
                            />
                        </FormControl>
                    </FormItem>
                );
            }}
        />
    );
};
