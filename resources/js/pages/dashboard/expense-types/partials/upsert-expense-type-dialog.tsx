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
    expenseType?: z.infer<typeof schemas.ExpenseTypeResource>;
    onSuccess?: () => void;
};

const formSchema = z.object({
    name: z.string().nonempty().max(255),
});

export const UpsertExpenseTypeDialog = ({ open, setOpen, expenseType, onSuccess }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expense-types'], common: l.common, enum: l.enum };

    const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { name: expenseType?.name || '' } });

    useEffect(() => {
        form.reset({ name: expenseType?.name || '' });
    }, [expenseType, form.formState.isSubmitSuccessful]);

    async function onSubmit(body: z.output<typeof formSchema>) {
        try {
            if (expenseType) await api['expense-types.update'](body, { params: { expenseType: expenseType.id } });
            else await api['expense-types.store'](body);
            toast.success(`${locale['Expense Type']} ${expenseType ? locale.common.Updated : locale.common.Created} ${locale.common.Successfully}`);
            onSuccess?.();
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
                    <DialogTitle>{expenseType ? 'Update' : 'Create'} Expense Type</DialogTitle>
                    <DialogDescription>
                        {locale.common['Fill in the details below to']}
                        {expenseType ? locale.common.Updated : locale.common.Created} {locale['Expense Type']}.
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
