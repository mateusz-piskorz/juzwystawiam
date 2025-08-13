import { InputField } from '@/components/common/form-fields/input-field';
import { SelectField } from '@/components/common/form-fields/select-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { COUNTRIES } from '@/lib/constants/countries';
import { TYPE_OF_BUSINESS } from '@/lib/constants/enums/type-of-business';
import { CreateContractorDTO, createContractorDTO } from '@/lib/constants/zod/contractor';
import { upsertContractor } from '@/lib/data/contractors';
import { useLocale } from '@/lib/hooks/use-locale';
import { Contractor } from '@/lib/types/contractor';
import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ContractorTripleBox } from './contractor-triple-box';

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: Partial<CreateContractorDTO>;
    contractorId?: number;
    onSuccess?: (contractor: Contractor) => void;
    disableIsOwnCompany?: boolean;
};

export const UpsertContractorDialog = ({ open, setOpen, defaultValues, contractorId, onSuccess, disableIsOwnCompany }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/contractors'], common: l.common, enum: l.enum };

    const form = useForm<CreateContractorDTO>({
        resolver: zodResolver(createContractorDTO),
        defaultValues,
    });
    const isSelfEmployed = form.watch('type_of_business') === TYPE_OF_BUSINESS.SELF_EMPLOYED;

    useEffect(() => {
        form.reset(defaultValues ?? { is_own_company: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(body: z.infer<typeof createContractorDTO>) {
        try {
            const contractor = await upsertContractor({ body, contractorId });
            toast.success(`${locale.Contractor} ${contractorId ? locale.common.Updated : locale.common.Created} ${locale.common.Successfully}!`);
            onSuccess?.(contractor);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            console.error(errorMessage);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>
                        {contractorId ? locale.common.Update : locale.common.Create} {locale.Contractor}
                    </DialogTitle>
                    <DialogDescription>
                        {locale.common['Fill in the details below to']} {contractorId ? locale.common.Update : locale.common.Create}{' '}
                        {locale.Contractor}.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(onSubmit)(event);
                        }}
                        className="space-y-8"
                    >
                        <SelectField
                            form={form}
                            name="type_of_business"
                            label={locale['Type of business']}
                            selectOptions={Object.values(TYPE_OF_BUSINESS).map((val) => ({ label: locale.enum.TYPE_OF_BUSINESS[val], value: val }))}
                        />

                        <ContractorTripleBox form={form} disableIsOwnCompany={disableIsOwnCompany} />

                        <div className="rounded border">
                            <div className="flex h-[60px]">
                                <InputField
                                    form={form}
                                    name="postal_code"
                                    label={locale['Postal code']}
                                    className="rounded-none rounded-ss border-none"
                                />
                                <Separator orientation="vertical" />
                                <InputField form={form} name="city" label={locale.City} className="rounded-none rounded-se border-none" />
                            </div>

                            <Separator orientation="horizontal" />

                            <InputField form={form} name="street_name" label={locale['Street name']} className="rounded-none border-none" />

                            <Separator orientation="horizontal" />

                            <SelectField
                                className="rounded-none rounded-ee rounded-es border-none"
                                form={form}
                                name="country"
                                label={locale.Country}
                                selectOptions={COUNTRIES.map((val) => ({
                                    label: val,
                                    value: val,
                                }))}
                            />
                        </div>

                        <div className="rounded border">
                            {isSelfEmployed && (
                                <>
                                    <div className="flex h-[60px]">
                                        <InputField
                                            form={form}
                                            name="first_name"
                                            label={locale['First name']}
                                            className="rounded-none rounded-ss rounded-se border-none"
                                        />
                                        <Separator orientation="vertical" />
                                        <InputField
                                            form={form}
                                            name="surname"
                                            label={locale.Surname}
                                            className="rounded-none rounded-se border-none"
                                        />
                                    </div>
                                    <Separator orientation="horizontal" />
                                </>
                            )}

                            <div className="flex h-[60px]">
                                <InputField
                                    form={form}
                                    name="email"
                                    label={`${locale.Email} (${locale.common.Optional})`}
                                    type="email"
                                    inputMode="email"
                                    className={cn('rounded-none border-none', !isSelfEmployed && 'rounded-ss')}
                                />
                                <Separator orientation="vertical" />
                                <InputField
                                    form={form}
                                    name="phone"
                                    label={`${locale.Phone} (${locale.common.Optional})`}
                                    type="tel"
                                    inputMode="numeric"
                                    className={cn('rounded-none border-none', !isSelfEmployed && 'rounded-se')}
                                />
                            </div>
                            <Separator orientation="horizontal" />
                            <InputField
                                form={form}
                                name="bank_account"
                                label={`${locale['Bank Account']} (${locale.common.Optional})`}
                                type="text"
                                inputMode="numeric"
                                className={cn('rounded-none rounded-ee rounded-es border-none', !isSelfEmployed && 'rounded-se')}
                            />
                        </div>

                        <div className="w-full text-right">
                            <Button type="submit">
                                {contractorId ? locale.common.Update : locale.common.Create} {locale.Contractor}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
