import { CalendarField } from '@/components/common/calendar-field';
import { Separator } from '@/components/ui/separator';
import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { cn } from '@/lib/utils/cn';

import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<InvoiceSchema>;
    className?: string;
};

export const SaleAndDueDates = ({ form, className }: Props) => {
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
