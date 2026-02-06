/* eslint-disable react-hooks/exhaustive-deps */

import { InputField } from '@/components/common/form-fields/input-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    expenseTypeId?: number;
    defaultValues?: Partial<z.infer<typeof schemas.ExpenseTypeResource>>;
    onSuccess?: (id: number) => void;
};

const formSchema = z.object({
    name: z.string().nonempty().max(255),
});

export const UpsertExpenseTypeDialog = ({ open, setOpen, expenseTypeId, defaultValues, onSuccess }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expense-types'], common: l.common, enum: l.enum };

    const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { name: defaultValues?.name || '' } });

    useEffect(() => {
        form.reset({ name: defaultValues?.name || '' });
    }, [defaultValues, form.formState.isSubmitSuccessful, expenseTypeId]);

    async function onSubmit(body: z.output<typeof formSchema>) {
        try {
            if (expenseTypeId) {
                const res = await api['expense-types.update'](body, { params: { expenseType: expenseTypeId } });
                onSuccess?.(res.id);
            } else {
                const res = await api['expense-types.store'](body);
                onSuccess?.(res.id);
            }
            toast.success(`${locale['Expense Type']} ${expenseTypeId ? locale.common.Updated : locale.common.Created} ${locale.common.Successfully}`);

            setOpen(false);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{expenseTypeId ? 'Update' : 'Create'} Expense Type</DialogTitle>
                    <DialogDescription>
                        {locale.common['Fill in the details below to']}
                        {expenseTypeId ? locale.common.Updated : locale.common.Created} {locale['Expense Type']}.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(onSubmit)(event);
                        }}
                        className="space-y-5"
                    >
                        <InputField form={form} name="name" label={locale['Expense Type name']} />

                        <div className="w-full text-right">
                            <Button type="submit" className="w-full sm:w-auto" size="lg">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
