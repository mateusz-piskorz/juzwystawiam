import { ContractorRole } from '@/lib/constants/enums/contractor-role';
import { VatSchema } from '@/lib/constants/zod/invoices/vat-schema';
import { UseFormReturn } from 'react-hook-form';
import { ContractorsSelectField } from './contractors-select-field';

type Props = {
    form: UseFormReturn<VatSchema>;
};

export const ContractorsSection = ({ form }: Props) => {
    return (
        <div className="z-10 flex flex-col gap-8 md:flex-row md:items-start">
            <ContractorsSelectField idx={0} form={form} role={ContractorRole.SELLER} label="Seller" />
            <ContractorsSelectField idx={1} form={form} role={ContractorRole.BUYER} label="Nazwa klienta" />
        </div>
    );
};
