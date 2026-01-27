import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { invoiceSchema } from '@/lib/constants/zod/invoice';
import { useLocale } from '@/lib/hooks/use-locale';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { SquarePlus } from 'lucide-react';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ProductItemDesktop } from './product-item/product-item-desktop';
import { ProductItemMobile } from './product-item/product-item-mobile';

type Props = { form: UseFormReturn<z.input<typeof invoiceSchema>> };

export const ProductsSection = ({ form }: Props) => {
    const locale = useLocale().locale['dashboard/invoices']['invoice-form'];
    const isMobile = useIsMobile();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'invoice_products',
    });

    return (
        <>
            <div className="relative z-0 mt-14 space-y-4 md:px-6">
                <h1 className="px-4 text-lg md:px-0">{locale.Products}</h1>
                <div className="flex flex-col gap-4 md:gap-4 md:overflow-x-auto">
                    {fields.map((invoiceItem, idx) => {
                        // todo: refactor total calculation
                        const priceW = form.watch(`invoice_products.${idx}.price`);
                        const quantityW = form.watch(`invoice_products.${idx}.quantity`);
                        const discountW = form.watch(`invoice_products.${idx}.discount`) || 0;
                        const vatRateW = Number(form.watch(`invoice_products.${idx}.vat_rate`)) || 0;

                        const netTotal = quantityW * priceW * (1 - discountW / 100);
                        const total = (netTotal * (1 + vatRateW / 100)).toFixed(2);

                        if (isMobile) {
                            return (
                                <React.Fragment key={`${invoiceItem.id}-mobile`}>
                                    <ProductItemMobile total={total} fieldsLength={fields.length} form={form} idx={idx} remove={remove} />
                                    {fields.length - 1 !== idx && <Separator />}
                                </React.Fragment>
                            );
                        }
                        return (
                            <ProductItemDesktop
                                total={total}
                                fieldsLength={fields.length}
                                form={form}
                                idx={idx}
                                remove={remove}
                                key={`${invoiceItem.id}-desktop`}
                            />
                        );
                    })}
                </div>
                <div className="flex px-4 md:px-0">
                    <Button
                        type="button"
                        onClick={() =>
                            append(
                                {
                                    name: '',
                                    price: 0,
                                    quantity: 1,
                                    measure_unit: 'PCS',
                                    vat_rate: '23',
                                    product_id: null,
                                    discount: null,
                                },
                                { shouldFocus: false },
                            )
                        }
                    >
                        <SquarePlus />
                        <span className="sr-only">{locale['add invoice product']}</span>
                    </Button>
                </div>
            </div>
        </>
    );
};
