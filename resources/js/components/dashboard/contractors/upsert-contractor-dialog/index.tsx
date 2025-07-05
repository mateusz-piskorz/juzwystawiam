import { InputField } from '@/components/common/input-field';
import { SelectField } from '@/components/common/select-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { COUNTRIES } from '@/lib/constants/countries';
import { TYPE_OF_BUSINESS, TypeOfBusinessTranslation } from '@/lib/constants/enums/type-of-business';
import { CreateContractorDTO, createContractorDTO } from '@/lib/constants/zod/contractors';
import { upsertContractor } from '@/lib/data/contractors';
import { Contractor } from '@/lib/types/contractor';
import { cn } from '@/lib/utils/cn';
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
};

export const UpsertContractorDialog = ({ open, setOpen, defaultValues, contractorId, onSuccess }: Props) => {
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
            toast.success(`Contractor ${contractorId ? 'updated' : 'created'} successfully`);
            onSuccess?.(contractor);
        } catch (error: unknown) {
            console.error(error);
            toast.error('Something went wrong');
        }
        setOpen(false);
    }
    console.log(form.formState.errors);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{contractorId ? 'Update' : 'Create'} Contractor</DialogTitle>
                    <DialogDescription>Fill in the details below to {contractorId ? 'update' : 'create'} contractor.</DialogDescription>
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
                            label="Rodzaj działalności gospodarczej"
                            selectOptions={Object.values(TYPE_OF_BUSINESS).map((val) => ({ label: TypeOfBusinessTranslation[val], value: val }))}
                        />

                        <ContractorTripleBox form={form} />

                        <div className="rounded border">
                            {isSelfEmployed && (
                                <>
                                    <div className="flex h-[60px]">
                                        <InputField
                                            form={form}
                                            name="first_name"
                                            label="First name"
                                            className="rounded-none rounded-ss rounded-se border-none"
                                        />
                                        <Separator orientation="vertical" />
                                        <InputField form={form} name="surname" label="Surname" className="rounded-none rounded-se border-none" />
                                    </div>
                                    <Separator orientation="horizontal" />
                                </>
                            )}

                            <div className="flex h-[60px]">
                                <InputField
                                    form={form}
                                    name="email"
                                    label="Email (Optional)"
                                    type="email"
                                    inputMode="email"
                                    className={cn('rounded-none border-none', !isSelfEmployed && 'rounded-ss')}
                                />
                                <Separator orientation="vertical" />
                                <InputField
                                    form={form}
                                    name="phone"
                                    label="Phone (Optional)"
                                    type="tel"
                                    inputMode="numeric"
                                    className={cn('rounded-none border-none', !isSelfEmployed && 'rounded-se')}
                                />
                            </div>
                            <Separator orientation="horizontal" />
                            <InputField
                                form={form}
                                name="bank_account"
                                label="Bank Account (Optional)"
                                type="text"
                                inputMode="numeric"
                                className={cn('rounded-none rounded-ee rounded-es border-none', !isSelfEmployed && 'rounded-se')}
                            />
                        </div>

                        <div className="rounded border">
                            <InputField form={form} name="city" label="City" className="rounded-none rounded-ss rounded-se border-none" />

                            <Separator orientation="horizontal" />

                            <InputField form={form} name="street_name" label="Street name (Optional)" className="rounded-none border-none" />

                            <Separator orientation="horizontal" />
                            <div className="flex h-[60px]">
                                <InputField form={form} name="postal_code" label="Postal code" className="rounded-none border-none" />
                                <Separator orientation="vertical" />
                                <InputField form={form} name="building_number" label="Building number" className="rounded-none border-none" />
                            </div>
                            <Separator orientation="horizontal" />
                            <SelectField
                                className="rounded-none rounded-ee rounded-es border-none"
                                form={form}
                                name="country"
                                label="Country"
                                selectOptions={COUNTRIES.map((val) => ({
                                    label: val,
                                    value: val,
                                }))}
                            />
                        </div>
                        <div className="w-full text-right">
                            <Button type="submit">{contractorId ? 'Update' : 'Create'} Contractor</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
