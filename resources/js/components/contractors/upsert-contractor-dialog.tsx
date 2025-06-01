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
    name: z.string().min(1),
    is_own_company: z.boolean(),
    nip: z.string().min(1),
    address: z.string().nullable(),
    city: z.string().nullable(),
    postal_code: z.string().nullable(),
    country: z.string().nullable(),
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: FormSchema;
    contractorId?: string;
    refetch: () => void;
};

export const UpsertContractorDialog = ({ open, setOpen, defaultValues, contractorId, refetch }: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            name: '',
            is_own_company: false,
            nip: '',
            address: '',
            city: '',
            postal_code: '',
            country: '',
            email: '',
            phone: '',
        },
    });

    useEffect(() => {
        form.reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = contractorId ? `/api/contractors/${contractorId}` : '/api/contractors';
        const res = await apiFetch(url, { method: contractorId ? 'PUT' : 'POST', body: JSON.stringify(values) });

        if (res.ok) {
            toast.success(`Contractor ${contractorId ? 'updated' : 'created'} successfully`);
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
                    <DialogTitle>{contractorId ? 'Update' : 'Create'} Contractor</DialogTitle>
                    <DialogDescription>Fill in the details below to {contractorId ? 'update' : 'create'} an contractor.</DialogDescription>
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
                            name="is_own_company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Is Own Company</FormLabel>
                                    <FormControl>
                                        <Checkbox onCheckedChange={(val) => field.onChange(val)} />
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
                                    <FormLabel>NIP</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={String(field.value)} />
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
