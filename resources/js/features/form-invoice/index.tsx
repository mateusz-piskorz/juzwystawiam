import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { invoiceSchema } from '@/lib/constants/zod/invoice';
import { api } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { Invoice } from '@/lib/types/invoice';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ContractorsSection } from './sections/contractors-section';
import { HeaderSection } from './sections/header-section';
import { ProductsSection } from './sections/products-section';
import { TopSection } from './sections/top-section';

type Props = {
    invoice?: Invoice;
};

export const FormInvoice = ({ invoice }: Props) => {
    const { user } = usePage().props.auth;
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices']['invoice-form'], common: l.common, base: l['dashboard/invoices'] };
    const form = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            issue_date: new Date(),
            number: `FR ${dayjs().format('DD/MM/YYYY')}`,
            invoice_contractors: [{ role: 'SELLER', contractor_id: user.default_seller_id }, { role: 'BUYER' }],
            invoice_products: [{ name: '', measure_unit: 'PCS', quantity: 1, price: 0 }],
            payment_method: user.default_payment_method,
            currency: user.default_currency,
            sale_date: new Date(),
            due_date: dayjs().add(7, 'days').toDate(),
            is_already_paid: true,
            ...invoice,
        },
    });

    async function onSubmit(body: z.output<typeof invoiceSchema>) {
        const data = {
            ...body,
            issue_date: String(body.issue_date.toISOString()),
            sale_date: String(body.sale_date.toISOString()),
            due_date: String(body.due_date.toISOString()),
        };

        try {
            let response;
            if (invoice) {
                response = await api['invoices.update'](data, { params: { invoice: invoice.id } });
            } else {
                response = await api['invoices.store'](data);
            }

            toast.success(
                `${locale.base.Invoice} ${invoice?.id ? locale['common'].Updated : locale['common'].Created} ${locale.common.Successfully}!`,
            );
            router.visit(`/dashboard/invoices/${response.id}`);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage || locale.common['something went wrong']);
            console.error(errorMessage);
        }
    }

    const [total, setTotal] = useState(0);
    const { watch, getValues } = form;

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
                <div className="flex items-center justify-between px-4 py-6 md:p-6">
                    <span>
                        {/* todo: static currency */}
                        {locale['Grand Total']}: {total} PLN
                    </span>
                    <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
                        {locale.common.Submit}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
