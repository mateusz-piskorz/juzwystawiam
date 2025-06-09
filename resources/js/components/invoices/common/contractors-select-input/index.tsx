import { ReactSelectInput } from '@/components/common/react-select-input';
import { UpsertContractorDialog } from '@/components/contractors/upsert-contractor-dialog';
import { ContractorRole } from '@/lib/constants/invoiceTypes';
import { getContractors } from '@/lib/data/contractors';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps, useState } from 'react';
import { ContractorAddress } from './contractor-address';
import { CustomOption } from './custom-option';
import { CustomSingleValue } from './custom-single-value';
import { Option } from './types';

type Props = {
    onChange: (args: { contractorId: number }) => void;
    selectedContractorId?: number;
    role: ContractorRole;
};

export const ContractorsSelectInput = ({ onChange, selectedContractorId, role }: Props) => {
    const [defaultValues, setDefaultValues] = useState<ComponentProps<typeof UpsertContractorDialog>['defaultValues'] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['contractor-list', role],
        queryFn: () =>
            getContractors({
                limit: 1000,
                is_own_company: role === ContractorRole.SELLER ? 'true' : 'false',
            }).then((res) => res.data.map((c) => ({ ...c, label: c.name, value: c.id }))),
    });

    const onChangeHandler = (data: Option) => {
        if (data.__isNew__) {
            setOpen(true);
            setDefaultValues({ name: data.value });
        } else {
            onChange({ contractorId: data.id });
        }
    };

    const selectedContractor = data?.find((e) => e.id === selectedContractorId);

    return (
        <>
            <UpsertContractorDialog
                defaultValues={defaultValues}
                open={open}
                setOpen={setOpen}
                onSuccess={({ id }) => onChange({ contractorId: id })}
            />
            <ReactSelectInput
                components={{
                    Option: (optionProps) =>
                        CustomOption({
                            props: optionProps,
                            onEdit: (contractor) => {
                                setDefaultValues(contractor);
                                setOpen(true);
                            },
                        }),
                    SingleValue: CustomSingleValue,
                }}
                styles={{
                    control: (base) => ({ ...base, height: '56px' }),
                    valueContainer: (base) => ({ ...base, paddingLeft: '12px', paddingRight: '12px' }),
                }}
                allowCreateWhileLoading
                options={data}
                isLoading={isLoading}
                onChange={(val) => onChangeHandler(val as Option)}
                value={data?.find((contractor) => contractor.id === selectedContractorId)}
            />

            {selectedContractor && <ContractorAddress className="pl-2" {...selectedContractor} />}
        </>
    );
};
