import { CalendarField } from '@/components/common/calendar-field';
import { NumberAndDateSchema } from '@/lib/constants/zod/invoices/base-invoice-schema';
import { UseFormReturn } from 'react-hook-form';
import { IssueNumberField } from '../atoms/issue-number-field';

type Props<T extends NumberAndDateSchema> = {
    form: UseFormReturn<T>;
};

export const HeaderSection = <T extends NumberAndDateSchema>({ form: propsForm }: Props<T>) => {
    const form = propsForm as unknown as UseFormReturn<NumberAndDateSchema>;

    const invoiceNumber = form.watch('number');

    return (
        <div className="flex flex-col justify-between gap-8 p-4 sm:flex-row sm:border-b">
            <IssueNumberField value={invoiceNumber} onChange={(val) => form.setValue('number', val)} />
            <CalendarField form={form} name="issue_date" label="Data wystawienia" className="bg-accent w-full hover:bg-transparent sm:w-[200px]" />
        </div>
    );
};
