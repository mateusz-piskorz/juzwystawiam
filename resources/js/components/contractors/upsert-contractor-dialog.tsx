import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Contractor } from '@/lib/types';
import { apiFetch } from '@/lib/utils/api-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Checkbox } from '../ui/checkbox';

const formSchema = z.object({
    is_own_company: z.boolean(),
    name: z.string().nonempty(),
    nip: z.string().nonempty(),
    postal_code: z.string().nonempty(),
    building_number: z.string().nonempty(),
    city: z.string().nonempty(),
    street_name: z.string().nonempty().nullish(),
    email: z.string().email().nullish(),
    country: z.string().nonempty().nullish(),
    phone: z.string().nonempty().nullish(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: Partial<FormSchema>;
    contractorId?: string;
    onSuccess?: (contractor: Contractor) => void;
};

export const UpsertContractorDialog = ({ open, setOpen, defaultValues, contractorId, onSuccess }: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = contractorId ? `/api/contractors/${contractorId}` : '/api/contractors';
        try {
            const contractor = await apiFetch<Contractor>(url, { method: contractorId ? 'PUT' : 'POST', body: JSON.stringify(values) });
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
                    <DialogDescription>Fill in the details below to {contractorId ? 'update' : 'create'} an contractor.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(onSubmit)(event);
                        }}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
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
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <h3>Dane Adresowe</h3>
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="street_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nazwa ulicy</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} />
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
                                            <FormLabel>Numer budynku</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="postal_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kod pocztowy</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} />
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
                                            <FormLabel>Nazwa Miejscowości</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
