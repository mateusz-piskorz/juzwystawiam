import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { SquarePlus } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { ProductItemDesktop } from './product-item/product-item-desktop';
import { ProductItemMobile } from './product-item/product-item-mobile';

type Props<T extends CreateInvoiceDTO> = {
    form: UseFormReturn<T>;
};
export const ProductsSection = <T extends CreateInvoiceDTO>({ form: formProps }: Props<T>) => {
    const isMobile = useIsMobile();

    const form = formProps as unknown as UseFormReturn<CreateInvoiceDTO>;
    const formType = form.watch('type');

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'invoice_products',
    });

    return (
        <>
            <div className="relative z-0 mt-14 space-y-4 md:px-6">
                <h1 className="px-4 text-lg md:px-0">Products</h1>
                <div className="flex flex-col gap-4 md:gap-4 md:overflow-x-auto">
                    {fields.map((invoiceItem, idx) => {
                        const priceW = form.watch(`invoice_products.${idx}.price`);
                        const quantityW = form.watch(`invoice_products.${idx}.quantity`);
                        const discountW = form.watch(`invoice_products.${idx}.discount`) || 0;

                        // total not reacting to discount change
                        const total = (quantityW * priceW * (1 - discountW / 100)).toFixed(2);

                        if (isMobile) {
                            return (
                                <>
                                    <ProductItemMobile
                                        total={total}
                                        fieldsLength={fields.length}
                                        form={form}
                                        idx={idx}
                                        remove={remove}
                                        key={invoiceItem.id}
                                    />
                                    {fields.length - 1 !== idx && <Separator />}
                                </>
                            );
                        }
                        return (
                            <ProductItemDesktop
                                total={total}
                                fieldsLength={fields.length}
                                form={form}
                                idx={idx}
                                remove={remove}
                                key={invoiceItem.id}
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
                                    measure_unit: MEASURE_UNIT.PCS,
                                    ...(formType === INVOICE_TYPE.VAT && { vat_rate: VAT_RATE.CASE23 }),
                                },
                                { shouldFocus: false },
                            )
                        }
                    >
                        <SquarePlus />
                    </Button>
                </div>
            </div>
        </>
    );
};
