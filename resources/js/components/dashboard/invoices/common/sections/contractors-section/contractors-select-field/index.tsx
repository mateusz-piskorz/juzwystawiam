import { ReactCreatableSelect } from '@/components/common/react-select';

import { UpsertContractorDialog } from '@/components/dashboard/contractors/upsert-contractor-dialog';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { getContractors } from '@/lib/data/contractors';
import { Contractor } from '@/lib/types/contractor';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CustomOption } from './custom-option';
import { Option } from './types';

type Props<T extends CreateInvoiceDTO> = {
    form: UseFormReturn<T>;
    role: CONTRACTOR_ROLE;
    label: string;
    idx: number;
};

export const ContractorsSelectField = <T extends CreateInvoiceDTO>({ form: formProps, role, label, idx }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<CreateInvoiceDTO>;
    const name = `invoice_contractors.${idx}.contractor_id` as const;
    const { control, watch, setValue } = form;
    const selectedContractorId = watch(name);

    const [defaultValues, setDefaultValues] = useState<Partial<Contractor> | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['contractor-list', role],
        queryFn: () =>
            getContractors({
                limit: 1000,
                is_own_company: role === CONTRACTOR_ROLE.SELLER ? 'true' : 'false',
            }).then((res) => res.data.map((c) => ({ ...c, label: c.company_name || `${c.first_name} ${c.surname}`, value: c.id }))),
    });

    return (
        <>
            <UpsertContractorDialog
                defaultValues={defaultValues}
                open={open}
                setOpen={setOpen}
                onSuccess={({ id }) => {
                    setValue(name, id);
                    refetch();
                }}
                contractorId={defaultValues?.id}
            />

            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <FormItem className="flex-1">
                            <FormControl>
                                <ReactCreatableSelect
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
                                            setDefaultValues({ company_name: data.value });
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
        </>
    );
};
