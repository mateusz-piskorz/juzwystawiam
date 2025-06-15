import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { CreateContractorDTO, createContractorDTO } from '@/lib/constants/zod/contractors';
import { upsertContractor } from '@/lib/data/contractors';
import { Contractor } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputField } from '../common/input-field';
import { SwitchField } from '../common/switch-field';

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

    useEffect(() => {
        form.reset(defaultValues ?? { is_own_company: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(body: z.infer<typeof createContractorDTO>) {
        try {
            const contractor = await upsertContractor({ body, contractorId });
            toast.success(`Contractor ${contractorId ? 'updated' : 'created'} successfully`);
            onSuccess?.(contractor);
            setOpen(false);
        } catch (error: unknown) {
            console.error(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-full overflow-auto">
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
                        <SwitchField
                            form={form}
                            name="is_own_company"
                            label="Is Own Company"
                            description="Indicates whether the company is owned by the user"
                        />

                        <InputField form={form} name="name" label="Contractor name" />

                        <InputField form={form} name="nip" label="NIP" />
                        <InputField form={form} name="postal_code" label="Postal code" />
                        <InputField form={form} name="city" label="City" />
                        <InputField form={form} name="email" label="Email" />
                        <InputField form={form} name="street_name" label="Street name" />
                        <InputField form={form} name="country" label="Country" />
                        <InputField form={form} name="phone" label="Phone" />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
