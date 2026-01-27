import { CalendarField } from '@/components/common/form-fields/calendar-field';
import { Separator } from '@/components/ui/separator';
import { invoiceSchema } from '@/lib/constants/zod/invoice';
import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/utils/cn';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type Props = {
    form: UseFormReturn<z.input<typeof invoiceSchema>>;
    className?: string;
};

export const SaleAndDueDates = ({ form, className }: Props) => {
    const locale = useLocale().locale['dashboard/invoices']['invoice-form'];
    const saleDate = form.watch('sale_date');

    return (
        <div className={cn('w-full rounded border', className)}>
            <CalendarField form={form} name="sale_date" label={locale['Sale Date']} className="rounded-none rounded-ss rounded-se border-none" />
            <Separator />
            <CalendarField
                form={form}
                name="due_date"
                className="rounded-none rounded-ee rounded-es border-none"
                saleDate={new Date(saleDate)}
                label={locale['Due date']}
            />
        </div>
    );
};
