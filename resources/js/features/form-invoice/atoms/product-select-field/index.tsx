/* eslint-disable react-hooks/exhaustive-deps */

import { ReactSelect } from '@/components/common/react-select';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { getProducts } from '@/lib/data/products';
import { useLocale } from '@/lib/hooks/use-locale';
import { Product } from '@/lib/types/product';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CustomOption } from './custom-option';
import { Option } from './types';

type Props<T extends InvoiceSchema> = {
    form: UseFormReturn<T>;
    idx: number;
};

export const ProductSelectField = <T extends InvoiceSchema>({ form: formProps, idx }: Props<T>) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const locale = useLocale().locale['dashboard/invoices']['invoice-form'];
    const form = formProps as unknown as UseFormReturn<InvoiceSchema>;
    const invoiceType = form.watch('type');
    const [q, setQ] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['product-list', q],
        queryFn: () =>
            getProducts({
                // todo: create getAllProducts
                limit: 100,
                q,
            }).then((res) => res.data.map((p) => ({ ...p, label: p.name, value: p.id }))),
    });

    const selectedProductId = form.watch(`invoice_products.${idx}.product_id`);
    const handleProductClick = (p: Product) => {
        form.setValue(`invoice_products.${idx}.product_id`, p.id);
        form.setValue(`invoice_products.${idx}.name`, p.name);
        form.setValue(`invoice_products.${idx}.price`, p.price);
        form.setValue(`invoice_products.${idx}.quantity`, 1);
        form.setValue(`invoice_products.${idx}.measure_unit`, p.measure_unit);
        if (invoiceType === INVOICE_TYPE.VAT) {
            form.setValue(`invoice_products.${idx}.vat_rate`, p.vat_rate);
        }
    };

    const debouncedSetQ = useCallback(
        debounce((q) => setQ(q), 400),
        [],
    );

    const hasOptions = !!data && data.length > 0;

    return (
        <>
            <FormField
                control={form.control}
                name={`invoice_products.${idx}.name`}
                render={({ field }) => {
                    return (
                        <FormItem className="w-full min-w-[160px]">
                            <FormControl>
                                <ReactSelect
                                    menuIsOpen={hasOptions ? menuIsOpen : false}
                                    onMenuOpen={() => hasOptions && setMenuIsOpen(true)}
                                    onMenuClose={() => setMenuIsOpen(false)}
                                    filterOption={() => true}
                                    name={field.name}
                                    onInputChange={(value, { action }) => {
                                        if (action === 'input-change') {
                                            field.onChange(value);
                                            debouncedSetQ(value);
                                        }
                                    }}
                                    inputValue={field.value}
                                    label={locale['Product name']}
                                    styles={{
                                        input: (baseStyles) => ({
                                            ...baseStyles,
                                            padding: '0px',
                                            margin: '0px',
                                        }),
                                    }}
                                    components={{
                                        Option: (optionProps) =>
                                            CustomOption({
                                                props: optionProps,
                                            }),
                                    }}
                                    options={data}
                                    isLoading={isLoading}
                                    onChange={(val) => {
                                        const data = val as Option;
                                        handleProductClick(data);
                                    }}
                                    value={data?.find((product) => product.id === selectedProductId)}
                                />
                            </FormControl>
                        </FormItem>
                    );
                }}
            />
        </>
    );
};
