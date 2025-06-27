import { InputField } from '@/components/common/input-field';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { getProducts } from '@/lib/data/products';
import { Product } from '@/lib/types/product';
import { cn } from '@/lib/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PopoverItem } from './popover-item';

type Props<T extends CreateInvoiceDTO> = {
    form: UseFormReturn<T>;
    className?: React.HTMLAttributes<'div'>['className'];
    idx: number;
};

export const ProductSelectField = <T extends CreateInvoiceDTO>({ form: formProps, className, idx }: Props<T>) => {
    const form = formProps as unknown as UseFormReturn<CreateInvoiceDTO>;
    const [open, setOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['product-list'],
        queryFn: () =>
            getProducts({
                limit: 1000,
            }),
    });

    const handleProductClick = (p: Product) => {
        form.setValue(`invoice_products.${idx}.product_id`, p.id);
        form.setValue(`invoice_products.${idx}.name`, p.name);
        form.setValue(`invoice_products.${idx}.price`, p.price);
        form.setValue(`invoice_products.${idx}.quantity`, 1);
        form.setValue(`invoice_products.${idx}.vat_rate`, p.vat_rate);
        form.setValue(`invoice_products.${idx}.measure_unit`, p.measure_unit);
        setOpen(false);
    };

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverAnchor className={cn('w-full', className)}>
                    <InputField
                        form={form}
                        name={`invoice_products.${idx}.name`}
                        label="Product name"
                        className="relative"
                        onFocus={() => setOpen(true)}
                    />
                </PopoverAnchor>
                <PopoverContent className="rounded p-4" style={{ width: 'var(--radix-popover-trigger-width)' }} avoidCollisions={false}>
                    <ul>{data?.data.map((product) => <PopoverItem key={product.id} product={product} onClick={handleProductClick} />)}</ul>
                </PopoverContent>
            </Popover>
        </>
    );
};
