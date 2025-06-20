import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';

import { InvoiceType } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { vatSchema, VatSchema } from '@/lib/constants/zod/invoices/vat-schema';
import { useForm } from 'react-hook-form';
import { ContractorsSection } from '../common/sections/contractors-section';
import { HeaderSection } from '../common/sections/header-section';
import { ProductsSection } from '../common/sections/products-section';
import { TopSection } from '../common/sections/top-section';

export const VatForm = () => {
    const form = useForm<VatSchema>({
        resolver: zodResolver(vatSchema),
        defaultValues: {
            type: InvoiceType.VAT,
            is_already_paid: true,
            number: '2/07/2025',
            invoice_products: [{ name: '', vat_rate: VAT_RATE.CASE23, measure_unit: MEASURE_UNIT.PCS, quantity: 1, price: 0 }],
        },
    });

    async function onSubmit(values: VatSchema) {
        console.log(values);
        // try {
        //     const res = await apiFetch('/api/invoices', { method: 'POST', body: JSON.stringify(values) });
        //     console.log(res);
        //     toast.error('created successfully!');
        // } catch (error: unknown) {
        //     toast.error('something went wrong');
        //     console.error(error);
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <HeaderSection form={form} />

                <div className="space-y-8 px-6 py-8">
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
