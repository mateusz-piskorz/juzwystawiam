import { ContractorRole } from '@/lib/constants/enums/contractor-role';
import { ContractorsSchema } from '@/lib/constants/zod/invoices/base-invoice-schema';
import { UseFormReturn } from 'react-hook-form';
import { ContractorsSelectField } from './contractors-select-field';

type Props<T extends ContractorsSchema> = {
    form: UseFormReturn<T>;
};

export const ContractorsSection = <T extends ContractorsSchema>({ form: formProps }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<ContractorsSchema>;
    return (
        <div className="z-10 flex flex-col gap-8 md:flex-row md:items-start">
            <ContractorsSelectField form={form} name="seller_id" role={ContractorRole.SELLER} label="Seller" />
            <ContractorsSelectField form={form} name="buyer_id" role={ContractorRole.BUYER} label="Nazwa klienta" />
        </div>
    );
};
