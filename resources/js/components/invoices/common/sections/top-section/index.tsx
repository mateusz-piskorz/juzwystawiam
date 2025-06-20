import { PaymentSchema, SaleAndDueSchema, SecretNoteSchema } from '@/lib/constants/zod/invoices/base-invoice-schema';
import { UseFormReturn } from 'react-hook-form';
import { SaleAndDueDates } from '../../atoms/sale-and-due-dates';
import { SecretNote } from '../../atoms/secret-note';
import { PaymentTripleBox } from './payment-triple-box';

type RequiredFields = SaleAndDueSchema & PaymentSchema & SecretNoteSchema;

type Props<T extends RequiredFields> = {
    form: UseFormReturn<T>;
};

export const TopSection = <T extends RequiredFields>({ form }: Props<T>) => {
    return (
        <div className="flex flex-col gap-8 md:flex-row">
            <SecretNote form={form} className="flex-1/2" />
            <div className="flex w-full flex-1/2 flex-col gap-4 sm:flex-row">
                <PaymentTripleBox className="flex-2/3" form={form} />
                <SaleAndDueDates form={form} className="flex-1/3" />
            </div>
        </div>
    );
};
