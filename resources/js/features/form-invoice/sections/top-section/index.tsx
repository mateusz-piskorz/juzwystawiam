import { invoiceSchema } from '@/lib/constants/zod/invoice';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { SaleAndDueDates } from '../../atoms/sale-and-due-dates';
import { SecretNote } from '../../atoms/secret-note';
import { PaymentTripleBox } from './payment-triple-box';

type Props = { form: UseFormReturn<z.input<typeof invoiceSchema>> };

export const TopSection = ({ form }: Props) => {
    return (
        <div className="flex flex-col gap-4 px-4 sm:gap-8 md:flex-row md:px-6">
            <SecretNote form={form} className="flex-1/2" />
            <div className="flex w-full flex-1/2 flex-col gap-4 sm:flex-row">
                <PaymentTripleBox className="flex-2/3" form={form} />
                <SaleAndDueDates form={form} className="flex-1/3" />
            </div>
        </div>
    );
};
