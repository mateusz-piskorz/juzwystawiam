import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Currency, PaymentMethod } from '@/lib/constants/invoiceTypes';
import { cn } from '@/lib/utils/cn';
import { PaymentSchema } from '@/lib/zod/invoices/base-invoice-schema';
import { UseFormReturn } from 'react-hook-form';

type Props<T extends PaymentSchema> = {
    form: UseFormReturn<T>;
};

export const PaymentTripleBox = <T extends PaymentSchema>({ form }: Props<T>) => {
    const { control } = form as unknown as UseFormReturn<PaymentSchema>;
    return (
        <div className="rounded border">
            <div className="flex h-[60px] border-b">
                <FormField
                    control={control}
                    name="payment_method"
                    render={({ field }) => (
                        <FormItem className="hover:bg-accent z-10 block w-full min-w-[70px]">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className={cn(
                                            'focus-visible:ring-0',
                                            'text-for h-full cursor-pointer rounded-none rounded-ss border-0',
                                            'outline-[var(--accent-foreground)] focus-visible:outline focus-visible:outline-solid',
                                        )}
                                    >
                                        <div className="flex flex-col items-start gap-1 truncate">
                                            {field.value && <FormLabel className="text-muted-foreground text-xs">Sposób płatności</FormLabel>}
                                            <SelectValue placeholder="Sposób płatności" />
                                        </div>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(PaymentMethod).map((paymentMethod) => (
                                        <SelectItem key={paymentMethod} value={paymentMethod}>
                                            {paymentMethod}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <Separator orientation="vertical" />

                <FormField
                    control={control}
                    name="payment_method"
                    render={({ field }) => (
                        <FormItem className="hover:bg-accent z-10 block w-full min-w-[70px]">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className={cn(
                                            'focus-visible:ring-0',
                                            'text-for h-full cursor-pointer rounded-none rounded-se border-0',
                                            'outline-[var(--accent-foreground)] focus-visible:outline focus-visible:outline-solid',
                                        )}
                                    >
                                        <div className="flex flex-col items-start gap-1 truncate">
                                            {field.value && <FormLabel className="text-muted-foreground text-xs">Waluta</FormLabel>}
                                            <SelectValue placeholder="Waluta" />
                                        </div>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(Currency).map((currency) => (
                                        <SelectItem key={currency} value={currency}>
                                            {currency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="is_already_paid"
                render={({ field }) => (
                    <FormItem className="group hover:bg-accent">
                        <div
                            className={cn(
                                'flex h-[60px] cursor-pointer flex-row items-center justify-between rounded-ee rounded-es p-3',
                                'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
                            )}
                        >
                            <div className="w-[calc(100%-32px)] space-y-0.5 truncate">
                                <FormLabel className="truncate">Faktura opłacona</FormLabel>
                                <FormDescription className="truncate">Oznacz fakturę jako opłaconą</FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    className="dark:group-hover:data-[state=unchecked]:bg-background w-[32px]"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};
