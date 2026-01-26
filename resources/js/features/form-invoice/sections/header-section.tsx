import { CalendarField } from '@/components/common/form-fields/calendar-field';
import { invoiceSchema } from '@/lib/constants/zod/invoice';
import { useLocale } from '@/lib/hooks/use-locale';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { IssueNumberField } from '../atoms/issue-number-field';

type Props = {
    form: UseFormReturn<z.input<typeof invoiceSchema>>;
};

export const HeaderSection = ({ form }: Props) => {
    const locale = useLocale().locale['dashboard/invoices']['invoice-form'];

    const invoiceNumber = form.watch('number');

    return (
        <div className="flex flex-col justify-between gap-8 px-4 pt-4 sm:flex-row sm:border-b sm:p-4 md:px-6">
            <IssueNumberField value={invoiceNumber} onChange={(val) => form.setValue('number', val)} />
            <CalendarField
                form={form}
                name="issue_date"
                label={locale['Issue date']}
                className="bg-accent w-full hover:bg-transparent sm:w-[200px]"
            />
        </div>
    );
};
