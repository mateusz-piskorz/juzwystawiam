import { CalendarField } from '@/components/common/calendar-field';
import { Separator } from '@/components/ui/separator';
import { SaleAndDueSchema } from '@/lib/constants/zod/invoices/base-invoice-schema';
import { cn } from '@/lib/utils/cn';

import { UseFormReturn } from 'react-hook-form';

type Props<T extends SaleAndDueSchema> = {
    form: UseFormReturn<T>;
    className?: string;
};

export const SaleAndDueDates = <T extends SaleAndDueSchema>({ form: propsForm, className }: Props<T>) => {
    const form = propsForm as unknown as UseFormReturn<SaleAndDueSchema>;

    const saleDate = form.watch('sale_date');

    return (
        <div className={cn('w-full rounded border', className)}>
            <CalendarField form={form} name="sale_date" label="Data sprzedaży" className="rounded-none rounded-ss rounded-se border-none" />
            <Separator />
            <CalendarField
                form={form}
                name="due_date"
                className="rounded-none rounded-ee rounded-es border-none"
                saleDate={saleDate}
                label="Termin zapłaty"
            />
        </div>
    );
};
