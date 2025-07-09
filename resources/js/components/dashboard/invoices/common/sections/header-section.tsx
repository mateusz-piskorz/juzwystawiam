import { CalendarField } from '@/components/common/calendar-field';
import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { UseFormReturn } from 'react-hook-form';
import { IssueNumberField } from '../atoms/issue-number-field';

type Props<T extends InvoiceSchema> = {
    form: UseFormReturn<T>;
};

export const HeaderSection = <T extends InvoiceSchema>({ form: formProps }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<InvoiceSchema>;
    const invoiceNumber = form.watch('number');

    return (
        <div className="flex flex-col justify-between gap-8 px-4 pt-4 sm:flex-row sm:border-b sm:p-4 md:px-6">
            <IssueNumberField value={invoiceNumber} onChange={(val) => form.setValue('number', val)} />
            <CalendarField form={form} name="issue_date" label="Data wystawienia" className="bg-accent w-full hover:bg-transparent sm:w-[200px]" />
        </div>
    );
};
