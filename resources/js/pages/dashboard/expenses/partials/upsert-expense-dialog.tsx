/* eslint-disable react-hooks/exhaustive-deps */

import { CurrencyField } from '@/components/common/form-fields/currency-field';
import { InputField } from '@/components/common/form-fields/input-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ExpenseTypesSelectField } from './expense-types-select-field';

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    expense?: z.infer<typeof schemas.ExpenseResource>;
    onSuccess?: () => void;
};

const formSchema = z.object({
    expense_type_id: z.number().nullish(),
    title: z.string().nonempty().max(255),
    description: z.string().nullish(),
    total: z.coerce.number().min(0),
});

const defaultValues = { description: '', expense_type_id: null, title: '', total: 0 };

export const UpsertExpenseDialog = ({ open, setOpen, expense, onSuccess }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/expenses'], common: l.common, enum: l.enum };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: expense || defaultValues,
    });

    useEffect(() => {
        form.reset(expense || defaultValues);
    }, [expense, form.formState.isSubmitSuccessful]);

    async function onSubmit(body: z.output<typeof formSchema>) {
        try {
            if (expense) await api['expenses.update'](body, { params: { expense: expense.id } });
            else await api['expenses.store'](body);
            toast.success(`${locale['Expense']} ${expense ? locale.common.Updated : locale.common.Created} ${locale.common.Successfully}`);
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
                    <DialogTitle>{expense ? 'Update' : 'Create'} Expense</DialogTitle>
                    <DialogDescription>
                        {locale.common['Fill in the details below to']}
                        {expense ? locale.common.Updated : locale.common.Created} {locale['Expense']}.
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
                        <InputField form={form} name="title" label={locale['Expense title']} />

                        {/* todo: consider making reusable textarea */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder={locale['Expense description']}
                                            className="h-[123px] resize-none"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <ExpenseTypesSelectField form={form} name="expense_type_id" />

                        <CurrencyField form={form} name="total" label={locale['Expense total']} />

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
