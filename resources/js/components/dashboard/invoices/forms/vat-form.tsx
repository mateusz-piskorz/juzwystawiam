import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CONTRACTOR_ROLE } from '@/lib/constants/enums/contractor-role';
import { Currency } from '@/lib/constants/enums/currency';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { PaymentMethod } from '@/lib/constants/enums/payment-method';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { vatSchema, VatSchema } from '@/lib/constants/zod/invoices';
import { upsertInvoice } from '@/lib/data/invoices';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ContractorsSection } from '../common/sections/contractors-section';
import { HeaderSection } from '../common/sections/header-section';
import { ProductsSection } from '../common/sections/products-section';
import { TopSection } from '../common/sections/top-section';

type Props = {
    defaultValues?: VatSchema;
    invoiceId?: number;
};

export const VatForm = ({ defaultValues, invoiceId }: Props) => {
    const form = useForm<VatSchema>({
        resolver: zodResolver(vatSchema),
        defaultValues: defaultValues || {
            type: INVOICE_TYPE.VAT,
            is_already_paid: true,
            number: '2/07/2025',
            invoice_products: [{ name: '', vat_rate: VAT_RATE.CASE23, measure_unit: MEASURE_UNIT.PCS, quantity: 1, price: 0 }],
            invoice_contractors: [{ role: CONTRACTOR_ROLE.BUYER }, { role: CONTRACTOR_ROLE.SELLER }],
            currency: Currency.PLN,
            sale_date: new Date('2025-06-20T22:00:00.000Z'),
            due_date: new Date('2025-06-23T22:00:00.000Z'),
            issue_date: new Date('2025-06-22T22:00:00.000Z'),
            payment_method: PaymentMethod.CARD,
        },
    });

    async function onSubmit(body: VatSchema) {
        try {
            const response = await upsertInvoice({ body, invoiceId });
            toast.success(invoiceId ? 'invoice updated successfully!' : 'invoice created successfully!');
            router.visit(`/dashboard/invoices/${response.id}`);
        } catch (error: unknown) {
            toast.error('something went wrong');
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <HeaderSection form={form} />
                <div className="space-y-4 px-6 py-4 sm:space-y-8 sm:py-8">
                    <TopSection form={form} />
                    <ContractorsSection form={form} />
                    <ProductsSection form={form} />
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
