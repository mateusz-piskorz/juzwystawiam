import { InputField } from '@/components/common/form-fields/input-field';
import { SwitchField } from '@/components/common/form-fields/switch-field';
import { Separator } from '@/components/ui/separator';
import { TYPE_OF_BUSINESS } from '@/lib/constants/enums/type-of-business';
import { CreateContractorDTO } from '@/lib/constants/zod/contractor';
import { useLocale } from '@/lib/hooks/use-locale';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<CreateContractorDTO>;
};

export const ContractorTripleBox = ({ form }: Props) => {
    const locale = useLocale().locale['dashboard/contractors'];
    const isPrivatePerson = form.watch('type_of_business') === TYPE_OF_BUSINESS.PRIVATE_PERSON;

    return (
        <div className="w-full min-w-[200px] rounded border">
            <div className="flex h-[60px]">
                <InputField
                    form={form}
                    name={isPrivatePerson ? 'first_name' : 'nip'}
                    label={isPrivatePerson ? locale['First name'] : locale['Company nip']}
                    className="rounded-none rounded-ss border-none"
                />

                <Separator orientation="vertical" />
                <InputField
                    form={form}
                    name={isPrivatePerson ? 'surname' : 'company_name'}
                    label={isPrivatePerson ? locale.Surname : locale['Company name']}
                    className="rounded-none rounded-se border-none"
                />
            </div>
            <Separator orientation="horizontal" />

            <SwitchField
                resetBorder
                form={form}
                name="is_own_company"
                className="rounded-ee rounded-es"
                label={locale['Is own company']}
                description={locale['indicates whether the company is owned by the user']}
            />
        </div>
    );
};
