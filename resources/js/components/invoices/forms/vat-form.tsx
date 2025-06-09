import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ContractorRole, InvoiceType } from '@/lib/constants/invoiceTypes';
import { vatSchema, VatSchema } from '@/lib/zod/invoices/vat-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePage } from '@/lib/hooks/use-page';
import { apiFetch } from '@/lib/utils/api-fetch';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ContractorsSelectInput } from '../common/contractors-select-input';
import { InvoiceSaleAndDueDates } from '../common/invoice-sale-and-due-dates';
import { PaymentTripleBox } from '../common/payment-triple-box';

export const VatForm = () => {
    const { auth } = usePage().props;
    // const [total, setTotal] = useState(0);
    const form = useForm<VatSchema>({
        resolver: zodResolver(vatSchema),
        defaultValues: {
            number: 'FR1/ 18 may 2025',
            type: InvoiceType.VAT,
            issue_date: '0001-11-11',
            // is_already_paid: false,
        },
    });

    // const { watch, getValues } = form;

    // const { fields, append, remove } = useFieldArray({
    //     control: form.control,
    //     name: 'invoice_items',
    // });

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

    // useEffect(() => {
    //     const { unsubscribe } = watch((_, { name, type }) => {
    //         // first get all values
    //         const value = getValues();
    //         // check if the update was a change not a delete
    //         if (type === 'change' && name) {
    //             // check if a subproperty has changed and not the array or some of its elements themself
    //             if (name.endsWith('quantity') || name.endsWith('vat') || name.endsWith('net_price')) {
    //                 const items = value.invoice_items || [];
    //                 const total = items.reduce((sum, item) => (item ? sum + (Number(item.net_price) || 0) * (Number(item.quantity) || 0) : sum), 0);

    //                 setTotal(total);
    //             }
    //         }
    //     });
    //     return () => unsubscribe();
    // }, [watch]);

    return (
        <Form {...form}>
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InvoiceSaleAndDueDates form={form} />
                    <PaymentTripleBox form={form} />
                    {/* <div>
                        <FormField
                            control={form.control}
                            name="issue_date"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex-1">
                                        <FormLabel>Seller</FormLabel>
                                        <FormControl>
                                            <ContractorsSelectInput
                                                onChange={({ contractorId }) => {
                                                    field.onChange(contractorId);
                                                    form.trigger('seller_id');
                                                }}
                                                selectedContractorId={field.value}
                                                role={ContractorRole.SELLER}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div> */}
                    <div className="flex flex-col gap-4 md:min-h-[126px] md:flex-row md:items-start">
                        <FormField
                            control={form.control}
                            name="seller_id"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex-1">
                                        <FormLabel>Seller</FormLabel>
                                        <FormControl>
                                            <ContractorsSelectInput
                                                onChange={({ contractorId }) => {
                                                    field.onChange(contractorId);
                                                    form.trigger('seller_id');
                                                }}
                                                selectedContractorId={field.value}
                                                role={ContractorRole.SELLER}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="buyer_id"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex-1">
                                        <FormLabel>Buyer</FormLabel>
                                        <FormControl>
                                            <ContractorsSelectInput
                                                onChange={({ contractorId }) => {
                                                    field.onChange(contractorId);
                                                    form.trigger('buyer_id');
                                                }}
                                                selectedContractorId={field.value}
                                                role={ContractorRole.BUYER}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="issue_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issue Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Invoice Contractors */}
                    {/* <div className="bg-red flex">
                        {form.watch('invoice_contractors').map((contractor, idx) => (
                            <div key={idx} className="flex-1 space-y-2 rounded border p-4">
                                <h2 className="mb-4 font-semibold">{contractor.role.toUpperCase()}</h2>

                                <FormField
                                    control={form.control}
                                    name={`invoice_contractors.${idx}.nip`}
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
                                    name={`invoice_contractors.${idx}.email`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`invoice_contractors.${idx}.phone`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`invoice_contractors.${idx}.phone`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a fruit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Fruits</SelectLabel>
                                                            <SelectItem value="apple">Apple</SelectItem>
                                                            <SelectItem value="banana">Banana</SelectItem>
                                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                                            <SelectItem value="grapes">Grapes</SelectItem>
                                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                    </div> */}
                    {/* Invoice Items */}
                    {/* {fields.map((invoiceItem, idx) => (
                        <div key={idx} className="relative rounded border p-4">
                            <h2 className="mb-4 font-semibold">Item {idx + 1}</h2>
                            <div className="flex items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name={`invoice_items.${idx}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
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
                                                <FormMessage />
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
                                                <FormMessage />
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
                                                <FormMessage />
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
                    ))} */}
                    {/* <Button type="button" onClick={() => append({ name: '', net_price: 0, quantity: 1, vat: 0 })}>
                        Add new InvoiceItem
                    </Button> */}
                    {/* <div>
                        <span>Total: {total}</span>
                    </div> */}
                    {form.formState.errors.root?.message}
                    <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </form>
                <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
            </div>
        </Form>
    );
};
