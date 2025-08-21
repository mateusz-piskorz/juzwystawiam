import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { useLocale } from '@/lib/hooks/use-locale';
import { UseFormReturn } from 'react-hook-form';
import { ContractorsSelectField } from '../atoms/contractors-select-field';

type Props<T extends InvoiceSchema> = {
    form: UseFormReturn<T>;
};

export const ContractorsSection = <T extends InvoiceSchema>({ form: formProps }: Props<T>) => {
    const locale = useLocale().locale['dashboard/invoices'];
    const form = formProps as unknown as UseFormReturn<InvoiceSchema>;
    return (
        <div className="z-10 flex flex-col gap-4 px-4 sm:gap-8 md:flex-row md:items-start md:px-6">
            <ContractorsSelectField idx={0} form={form} role="SELLER" label={locale.Seller} />
            <ContractorsSelectField idx={1} form={form} role="BUYER" label={locale.Buyer} />
        </div>
    );
};
