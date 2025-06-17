import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { TypedFieldPath } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { useReducer } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/input';

type FieldType = number;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    label: string;
};

const moneyFormatter = Intl.NumberFormat('pl-PL', {
    // currency: 'PLN',
    // currencyDisplay: 'symbol',
    // currencySign: 'standard',
    // style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const CurrencyField = <T extends FieldValues>({ form, label, name: propsName }: Props<T>) => {
    const name = propsName as string;
    const { control, getValues } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    const initialValue = getValues(name) ? moneyFormatter.format(getValues(name)) : '';

    const [value, setValue] = useReducer((_: any, next: string) => {
        const digits = next.replace(/\D/g, '');
        return moneyFormatter.format(Number(digits) / 100);
    }, initialValue);

    function handleChange(realChangeFn: (val: number) => void, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, '');
        const realValue = Number(digits) / 100;
        realChangeFn(realValue);
    }

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
                            'hover:bg-accent relative z-10 block h-[60px] min-w-[100px] rounded border',
                            'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
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
                                className={cn('h-full', value && 'pt-5')}
                            />
                        </FormControl>
                    </FormItem>
                );
            }}
        />
    );
};
