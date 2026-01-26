/* eslint-disable react-hooks/exhaustive-deps */

import { ReactCreatableSelect } from '@/components/common/react-select';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UpsertContractorDialog } from '@/features/upsert-contractor-dialog';
import { invoiceSchema } from '@/lib/constants/zod/invoice';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { CustomOption } from './custom-option';
import { Option } from './types';

type Props = {
    form: UseFormReturn<z.input<typeof invoiceSchema>>;
    role: z.infer<typeof schemas.ContractorRole>;
    label: string;
    idx: number;
};

export const ContractorsSelectField = ({ form, role, label, idx }: Props) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const name = `invoice_contractors.${idx}.contractor_id` as const;
    const { control, watch, setValue } = form;
    const selectedContractorId = watch(name);
    const [q, setQ] = useState('');

    const [defaultValues, setDefaultValues] = useState<Partial<z.infer<typeof schemas.ContractorResource>> | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['contractor-list', role, q],
        queryFn: () =>
            api['contractors.index']({ queries: { limit: 100, q, is_own_company: role === 'SELLER' ? 'true' : 'false' } }).then((res) =>
                res.data.map((c) => ({ ...c, label: c.company_name, value: c.id })),
            ),
    });

    const debouncedSetQ = useCallback(
        debounce((q) => setQ(q), 400),
        [],
    );
    const hasOptions = !!data && data.length > 0;

    return (
        <>
            <UpsertContractorDialog
                disableIsOwnCompany
                defaultValues={defaultValues}
                open={open}
                setOpen={setOpen}
                onSuccess={(id) => {
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
                                    openMenuOnClick={hasOptions}
                                    openMenuOnFocus={hasOptions}
                                    menuIsOpen={menuIsOpen}
                                    onMenuOpen={() => setMenuIsOpen(true)}
                                    onMenuClose={() => {
                                        setQ('');
                                        setMenuIsOpen(false);
                                    }}
                                    label={label}
                                    components={{
                                        NoOptionsMessage: () => null,
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
                                        if (!data.__isNew__) {
                                            field.onChange(data.id);
                                        }
                                    }}
                                    onInputChange={(value, { action }) => {
                                        if (action === 'input-change') {
                                            debouncedSetQ(value);
                                        }
                                    }}
                                    value={data?.find((contractor) => contractor.id === selectedContractorId)}
                                    filterOption={() => true}
                                    onCreateOption={(value) => {
                                        setDefaultValues({ company_name: value, is_own_company: role === 'SELLER' });
                                        setOpen(true);
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    );
                }}
            />
        </>
    );
};
