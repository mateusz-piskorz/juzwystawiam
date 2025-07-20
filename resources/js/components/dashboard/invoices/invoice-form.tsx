/* eslint-disable react-hooks/exhaustive-deps */

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { InvoiceSchema, invoiceSchema } from '@/lib/constants/zod/invoice';
import { upsertInvoice } from '@/lib/data/invoices';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ContractorsSection } from './common/sections/contractors-section';
import { HeaderSection } from './common/sections/header-section';
import { ProductsSection } from './common/sections/products-section';
import { TopSection } from './common/sections/top-section';

type Props = {
    defaultValues?: Partial<InvoiceSchema>;
    invoiceId?: number;
    type: INVOICE_TYPE;
};

export const InvoiceForm = ({ defaultValues, invoiceId, type }: Props) => {
    const form = useForm<InvoiceSchema>({
        resolver: zodResolver(invoiceSchema),
        defaultValues,
    });

    async function onSubmit(body: InvoiceSchema) {
        try {
            const response = await upsertInvoice({ body, invoiceId });
            toast.success(invoiceId ? 'invoice updated successfully!' : 'invoice created successfully!');
            router.visit(`/dashboard/invoices/${response.id}`);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage || 'something went wrong');
            console.error(errorMessage);
        }
    }

    const [total, setTotal] = useState(0);
    const { watch, getValues } = form;

    useEffect(() => {
        form.setValue('type', type);
    }, [type]);

    useEffect(() => {
        const { unsubscribe } = watch((_, { name, type }) => {
            const value = getValues();

            if (type === 'change' && name) {
                if (name.endsWith('quantity') || name.endsWith('price') || name.endsWith('discount') || name.endsWith('vat_rate')) {
                    const items = value.invoice_products || [];

                    //todo: refactor total calculation
                    //todo: it returns NAN when type=NO_VAT
                    const total = items.reduce((sum, item) => {
                        if (!item) return sum;
                        const price = Number(item.price) || 0;
                        const quantity = Number(item.quantity) || 0;
                        const discount = (item.discount || 0) / 100;
                        let vatRate = 0;
                        if ('vat_rate' in item) {
                            vatRate = Number(item.vat_rate) / 100;
                        }
                        const net = price * quantity * (1 - discount);
                        const gross = net * (1 + vatRate);
                        return sum + gross;
                    }, 0);

                    setTotal(Number(total.toFixed(2)));
                }
            }
        });
        return () => unsubscribe();
    }, [watch, getValues]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <HeaderSection form={form} />
                <div className="space-y-4 border-b-[1px] py-8 sm:space-y-8">
                    <TopSection form={form} />

                    <ContractorsSection form={form} />
                    <ProductsSection form={form} />
                </div>
                <div className="flex items-center justify-between px-4 pt-6 md:p-6">
                    <span>Grand Total: {total} PLN</span>
                    <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
