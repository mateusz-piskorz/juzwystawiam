import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/utils/api-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    is_own_company: z.boolean(),
    nip: z.string().min(1, 'Nip date is required'),
    building_number: z.string().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: FormSchema;
    invoiceId?: string;
    refetch: () => void;
};

export const UpsertInvoiceDialog = ({ open, setOpen, defaultValues, invoiceId, refetch }: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || { name: '', is_own_company: false, nip: '' },
    });

    useEffect(() => {
        form.reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = invoiceId ? `/api/invoices/${invoiceId}` : '/api/invoices';

        const res = await apiFetch(url, { method: invoiceId ? 'PUT' : 'POST', body: JSON.stringify(values) });

        if (res.ok) {
            toast.success(`Invoice ${invoiceId ? 'updated' : 'created'} successfully`);
            refetch();
            setOpen(false);
        } else {
            toast.error('Something went wrong');
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-full overflow-auto">
                <DialogHeader>
                    <DialogTitle>{invoiceId ? 'Update' : 'Create'} Invoice</DialogTitle>
                    <DialogDescription>Fill in the details below to {invoiceId ? 'update' : 'create'} an invoice.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_own_company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issue Date</FormLabel>
                                    <FormControl>
                                        <Checkbox onCheckedChange={(val) => field.onChange(val)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="building_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issue Date</FormLabel>
                                    <FormControl>
                                        <Checkbox onCheckedChange={(val) => field.onChange(val)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issue Date</FormLabel>
                                    <FormControl>
                                        <Checkbox onCheckedChange={(val) => field.onChange(val)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postal_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issue Date</FormLabel>
                                    <FormControl>
                                        <Checkbox onCheckedChange={(val) => field.onChange(val)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
