import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { UseFormReturn } from 'react-hook-form';
import { ContractorsSelectField } from './contractors-select-field';

type Props<T extends CreateInvoiceDTO> = {
    form: UseFormReturn<T>;
};

export const ContractorsSection = <T extends CreateInvoiceDTO>({ form: formProps }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<CreateInvoiceDTO>;
    return (
        <div className="z-10 flex flex-col gap-4 px-4 sm:gap-8 md:flex-row md:items-start md:px-6">
            <ContractorsSelectField idx={0} form={form} role={CONTRACTOR_ROLE.SELLER} label="Seller" />
            <ContractorsSelectField idx={1} form={form} role={CONTRACTOR_ROLE.BUYER} label="Nazwa klienta" />
        </div>
    );
};
