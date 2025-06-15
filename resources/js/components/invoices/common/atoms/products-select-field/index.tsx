import { CreatableSelect } from '@/components/common/creatable-select';
import { UpsertContractorDialog } from '@/components/contractors/upsert-contractor-dialog';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

import { ContractorRole } from '@/lib/constants/enums/contractor-role';
import { getContractors } from '@/lib/data/contractors';
import { TypedFieldPath } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ContractorInfo } from './contractor-info';
import { CustomOption } from './custom-option';
import { Option } from './types';

type FieldType = string;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    role: ContractorRole;
    label: string;
};

export const ProductsSelectField = <T extends FieldValues>({ form, name: propName, role, label }: Props<T>) => {
    const name = propName as string;
    const { control, watch, setValue } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;
    const selectedContractorId = watch(name);

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

    const selectedContractor = data?.find((e) => e.id === selectedContractorId);

    return (
        <>
            <UpsertContractorDialog
                defaultValues={defaultValues}
                open={open}
                setOpen={setOpen}
                onSuccess={({ id }) => setValue(name, id as unknown as string)}
            />
            <div className="w-full space-y-2">
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => {
                        return (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <CreatableSelect
                                        label={label}
                                        components={{
                                            Option: (optionProps) =>
                                                CustomOption({
                                                    props: optionProps,
                                                    onEdit: (contractor) => {
                                                        setDefaultValues(contractor);
                                                        setOpen(true);
                                                    },
                                                }),
                                        }}
                                        allowCreateWhileLoading
                                        options={data}
                                        isLoading={isLoading}
                                        onChange={(val) => {
                                            const data = val as Option;
                                            if (data.__isNew__) {
                                                setDefaultValues({ name: data.value });
                                                setOpen(true);
                                            } else {
                                                field.onChange(data.id);
                                            }
                                        }}
                                        value={data?.find((contractor) => contractor.id === selectedContractorId)}
                                    />
                                </FormControl>
                            </FormItem>
                        );
                    }}
                />

                {selectedContractor && <ContractorInfo className="px-2 py-2" {...selectedContractor} />}
            </div>
        </>
    );
};
