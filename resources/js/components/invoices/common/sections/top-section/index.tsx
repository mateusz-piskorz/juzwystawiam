import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { UseFormReturn } from 'react-hook-form';
import { SaleAndDueDates } from '../../atoms/sale-and-due-dates';
import { SecretNote } from '../../atoms/secret-note';
import { PaymentTripleBox } from './payment-triple-box';

type Props<T extends CreateInvoiceDTO> = {
    form: UseFormReturn<T>;
};

export const TopSection = <T extends CreateInvoiceDTO>({ form: formProps }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<CreateInvoiceDTO>;
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
