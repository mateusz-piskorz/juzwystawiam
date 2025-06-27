import { InputField } from '@/components/common/input-field';
import { SwitchField } from '@/components/common/switch-field';
import { Separator } from '@/components/ui/separator';
import { TYPE_OF_BUSINESS } from '@/lib/constants/enums/type-of-business';
import { CreateContractorDTO } from '@/lib/constants/zod/contractors';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<CreateContractorDTO>;
};

export const ContractorTripleBox = ({ form }: Props) => {
    const isPrivatePerson = form.watch('type_of_business') === TYPE_OF_BUSINESS.PRIVATE_PERSON;

    return (
        <div className="w-full min-w-[200px] rounded border">
            <div className="flex h-[60px]">
                <InputField
                    form={form}
                    name={isPrivatePerson ? 'first_name' : 'nip'}
                    label={isPrivatePerson ? 'First name' : 'Company nip'}
                    className="rounded-none rounded-ss border-none"
                />

                <Separator orientation="vertical" />
                <InputField
                    form={form}
                    name={isPrivatePerson ? 'surname' : 'company_name'}
                    label={isPrivatePerson ? 'Surname' : 'Company name'}
                    className="rounded-none rounded-se border-none"
                />
            </div>
            <Separator orientation="horizontal" />

            <SwitchField
                resetBorder
                form={form}
                name="is_own_company"
                className="rounded-ee rounded-es"
                label="Is Own Company"
                description="indicates whether the company is owned by the user"
            />
        </div>
    );
};
