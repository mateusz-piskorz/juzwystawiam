import { InputField } from '@/components/common/form-fields/input-field';
import { SwitchField } from '@/components/common/form-fields/switch-field';
import { Separator } from '@/components/ui/separator';
import { CreateContractorDTO } from '@/lib/constants/zod/contractor';
import { useLocale } from '@/lib/hooks/use-locale';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<CreateContractorDTO>;
    disableIsOwnCompany?: boolean;
};

export const ContractorTripleBox = ({ form, disableIsOwnCompany }: Props) => {
    const locale = useLocale().locale['dashboard/contractors'];

    return (
        <div className="w-full min-w-[200px] rounded border">
            <div className="flex h-[60px]">
                <InputField form={form} name="company_name" label={locale['Company name']} className="rounded-none rounded-ss border-none" />
                <Separator orientation="vertical" />
                <InputField form={form} name="nip" optionalLabel label={locale['Company nip']} className="rounded-none rounded-se border-none" />
            </div>
            <Separator orientation="horizontal" />

            <SwitchField
                resetBorder
                form={form}
                name="is_own_company"
                className="rounded-ee rounded-es"
                label={locale['Is own company']}
                description={locale['indicates whether the company is owned by the user']}
                disabled={disableIsOwnCompany}
            />
        </div>
    );
};
