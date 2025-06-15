/* eslint-disable react-hooks/exhaustive-deps */

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { usePage } from '@/lib/hooks/use-page';
import { ContractorRole } from '@/lib/constants/enums/contractor-role';
import { InvoiceType } from '@/lib/constants/enums/invoice-type';
import { vatSchema, VatSchema } from '@/lib/constants/zod/invoices/vat-schema';
import { apiFetch } from '@/lib/utils/api-fetch';
import { Input, Textarea } from '@headlessui/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ContractorsSelectField } from '../common/atoms/contractors-select-field';
import { InvoiceFormHeader } from '../common/sections/invoice-form-header';
import { InvoiceFormTopSection } from '../common/sections/invoice-form-top-section';

export const VatForm = () => {
    // const { auth } = usePage().props;
    const [total, setTotal] = useState(0);
    const form = useForm<VatSchema>({
        resolver: zodResolver(vatSchema),
        defaultValues: {
            type: InvoiceType.VAT,
            is_already_paid: false,
            number: '2/07/2025',
        },
    });

    const { watch, getValues } = form;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'invoice_items',
    });

    async function onSubmit(values: VatSchema) {
        // everything is ok, submit invoice creation
        try {
            const res = await apiFetch('/api/invoices', { method: 'POST', body: JSON.stringify(values) });
            console.log(res);
            toast.error('created successfully!');
        } catch (error: unknown) {
            toast.error('something went wrong');
            console.error(error);
        }

        // @@old things:
        // for (const invoiceContractor of values.invoice_contractors) {
        //     if (!invoiceContractor.id) {
        //         console.log(`logic for creating contractor for ${invoiceContractor.role}`);
        //         const { nip } = invoiceContractor;
        //         try {
        //             const contractor = await getContractors({ nip: ['123', '4454'] });
        //             if (contractor) {
        //                 console.log('here for role', invoiceContractor.role);
        //                 console.log('contractor', contractor);
        //             }
        //         } catch (e: any) {
        //             console.log('e.message:', e.message);
        //         }
        //     }
        // }
        // const url = invoiceId ? `/api/invoices/${invoiceId}` : '/api/invoices';
        // const res = await apiFetch('/api/invoices', { method: 'POST', body: JSON.stringify(values) });
        // if (res.ok) {
        //     toast.success(`Invoice created successfully`);
        //     // refetch();
        //     // setOpen(false);
        // } else {
        //     toast.error('Something went wrong');
        // }
    }

    useEffect(() => {
        const { unsubscribe } = watch((_, { name, type }) => {
            // first get all values
            const value = getValues();
            // check if the update was a change not a delete
            if (type === 'change' && name) {
                // check if a subproperty has changed and not the array or some of its elements themself
                if (name.endsWith('quantity') || name.endsWith('vat') || name.endsWith('net_price')) {
                    const items = value.invoice_items || [];
                    const total = items.reduce((sum, item) => (item ? sum + (Number(item.net_price) || 0) * (Number(item.quantity) || 0) : sum), 0);

                    setTotal(total);
                }
            }
        });
        return () => unsubscribe();
    }, [watch]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <InvoiceFormHeader form={form} />

                <div className="space-y-8 p-4">
                    <InvoiceFormTopSection form={form} />

                    <div className="flex flex-col gap-4 md:min-h-[126px] md:flex-row md:items-start">
                        <ContractorsSelectField form={form} name="seller_id" role={ContractorRole.SELLER} label="Seller" />
                        <ContractorsSelectField form={form} name="buyer_id" role={ContractorRole.BUYER} label="Nazwa klienta" />
                    </div>

                    {/* todo: use products-select-field, and select field for vat */}
                    {/* Invoice Items */}
                    {fields.map((invoiceItem, idx) => (
                        <div key={idx} className="relative rounded border p-4">
                            <h2 className="mb-4 font-semibold">Item {idx + 1}</h2>
                            <div className="flex items-center gap-4">
                                {/* here we need to use onChange to also set other fields like price,vat itp */}
                                {/* also is good to pass form here for name field, check why name typescript prop is not working */}
                                {/* <ProductsSelectField form={form} name={`invoice_items.${idx}.name`} role={ContractorRole.SELLER} label="Seller" /> */}
                                <FormField
                                    control={form.control}
                                    name={`invoice_items.${idx}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            {/* <FormMessage /> */}
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-1 justify-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`invoice_items.${idx}.quantity`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={1} {...field} />
                                                </FormControl>
                                                {/* <FormMessage /> */}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`invoice_items.${idx}.net_price`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Net Price</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" {...field} />
                                                </FormControl>
                                                {/* <FormMessage /> */}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`invoice_items.${idx}.vat`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>VAT</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={String(field.value)}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select Vat" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="0">0%</SelectItem>
                                                            <SelectItem value="5">5%</SelectItem>
                                                            <SelectItem value="12">12%</SelectItem>
                                                            <SelectItem value="23">23%</SelectItem>
                                                            <SelectItem value="inne">todo:inne</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                {/* <FormMessage /> */}
                                            </FormItem>
                                        )}
                                    />
                                    <span>Total: {invoiceItem.quantity * invoiceItem.net_price} pln</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={() => remove(idx)}
                                aria-label="remove item"
                                className="absolute top-4 right-4 cursor-pointer"
                            >
                                <X />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={() => append({ name: '', net_price: 0, quantity: 1, vat: 0 })}>
                        Add new InvoiceItem
                    </Button>
                    <div>
                        <span>Total: {total}</span>
                    </div>
                    {form.formState.errors.root?.message}
                    <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </div>
            </form>
            <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        </Form>
    );
};
