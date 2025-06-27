import { CurrencyField } from '@/components/common/currency-field';
import { InputField } from '@/components/common/input-field';
import { SelectField } from '@/components/common/select-field';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { ProductSelectField } from './product-select-field';

type Props<T extends CreateInvoiceDTO> = {
    form: UseFormReturn<T>;
};
export const ProductsSection = <T extends CreateInvoiceDTO>({ form: formProps }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<CreateInvoiceDTO>;
    const formType = form.watch('type');
    const [total, setTotal] = useState(0);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'invoice_products',
    });

    const { watch, getValues } = form;

    // todo: fix it, not reacting on price change
    useEffect(() => {
        const { unsubscribe } = watch((_, { name, type }) => {
            // first get all values
            const value = getValues();
            // check if the update was a change not a delete
            if (type === 'change' && name) {
                // check if a subproperty has changed and not the array or some of its elements themself
                if (name.endsWith('quantity') || name.endsWith('vat') || name.endsWith('net_price')) {
                    const items = value.invoice_products || [];
                    const total = items.reduce((sum, item) => (item ? sum + (Number(item.price) || 0) * (Number(item.quantity) || 0) : sum), 0);

                    setTotal(total);
                }
            }
        });
        return () => unsubscribe();
    }, [watch, getValues]);

    return (
        <>
            <div className="relative z-0 mt-14">
                <h1 className="mb-4">Products</h1>
                <div className="space-y-4">
                    {fields.map((invoiceItem, idx) => {
                        const priceW = watch(`invoice_products.${idx}.price`);
                        const quantityW = watch(`invoice_products.${idx}.quantity`);
                        const discountW = watch(`invoice_products.${idx}.discount`) || 0;
                        const total = (quantityW * priceW * (1 - discountW / 100)).toFixed(2);

                        return (
                            <div className="flex items-center gap-4" key={invoiceItem.id}>
                                <ProductSelectField form={form} idx={idx} />

                                <div className="flex h-[60px] rounded border">
                                    <CurrencyField
                                        form={form}
                                        name={`invoice_products.${idx}.price`}
                                        label="Price"
                                        className="rounded-none rounded-ss rounded-es border-none"
                                    />
                                    <Separator orientation="vertical" />
                                    <InputField
                                        className="rounded-none border-none"
                                        form={form}
                                        name={`invoice_products.${idx}.quantity`}
                                        type="number"
                                        label="Quantity"
                                    />
                                    <Separator orientation="vertical" />
                                    {formType === INVOICE_TYPE.VAT && (
                                        <SelectField
                                            className="rounded-none border-none"
                                            form={form}
                                            name={`invoice_products.${idx}.vat_rate`}
                                            label="VAT"
                                            selectOptions={Object.values(VAT_RATE).map((val) => ({ label: `${val}%`, value: val }))}
                                        />
                                    )}
                                    <Separator orientation="vertical" />
                                    <SelectField
                                        className="rounded-none border-none"
                                        form={form}
                                        name={`invoice_products.${idx}.measure_unit`}
                                        label="Jednostka miary"
                                        selectOptions={Object.values(MEASURE_UNIT).map((val) => ({ label: val, value: val }))}
                                    />
                                    <Separator orientation="vertical" />
                                    <InputField
                                        form={form}
                                        name={`invoice_products.${idx}.discount`}
                                        type="number"
                                        label="Discount %"
                                        className="flex-1/6 rounded-none rounded-se rounded-ee border-none"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-nowrap">{total}PLN</p>

                                    <Button
                                        disabled={fields.length <= 1}
                                        variant="ghost"
                                        type="button"
                                        onClick={() => remove(idx)}
                                        aria-label="remove item"
                                        className="cursor-pointer hover:bg-transparent"
                                    >
                                        <X />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Button
                type="button"
                onClick={() =>
                    append({
                        name: '',
                        price: 0,
                        quantity: 1,
                        measure_unit: MEASURE_UNIT.PCS,
                        ...(formType === INVOICE_TYPE.VAT && { vat_rate: VAT_RATE.CASE23 }),
                    })
                }
            >
                Add new Product
            </Button>
            <div>
                <span>Total: {total}</span>
            </div>
        </>
    );
};
