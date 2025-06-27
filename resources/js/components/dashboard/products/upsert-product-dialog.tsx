import { CurrencyField } from '@/components/common/currency-field';
import { InputField } from '@/components/common/input-field';
import { SelectField } from '@/components/common/select-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { createProductDTO, CreateProductDTO } from '@/lib/constants/zod/products';
import { upsertProduct } from '@/lib/data/products';
import { Product } from '@/lib/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: Partial<CreateProductDTO>;
    productId?: number;
    onSuccess?: (product: Product) => void;
};

export const UpsertProductDialog = ({ open, setOpen, defaultValues, productId, onSuccess }: Props) => {
    const form = useForm<CreateProductDTO>({
        resolver: zodResolver(createProductDTO),
        defaultValues: defaultValues || {
            description: 'opis',
            name: 'product-test',
            vat_rate: VAT_RATE.CASE23,
            measure_unit: MEASURE_UNIT.HOUR,
            price: 32.2,
        },
    });

    useEffect(() => {
        form.reset(defaultValues ?? { vat_rate: VAT_RATE.CASE23 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(body: CreateProductDTO) {
        try {
            const product = await upsertProduct({ body, productId });
            toast.success(`Product ${productId ? 'updated' : 'created'} successfully`);
            onSuccess?.(product);
            setOpen(false);
        } catch (error: unknown) {
            console.error(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{productId ? 'Update' : 'Create'} Product</DialogTitle>
                    <DialogDescription>Fill in the details below to {productId ? 'update' : 'create'} Product.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(onSubmit)(event);
                        }}
                        className="space-y-5"
                    >
                        <InputField form={form} name="name" label="Product name" />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea placeholder="Product description" className="h-[123px] resize-none" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <CurrencyField form={form} name="price" label="Product price" />

                        <div className="flex w-full flex-col gap-5 sm:flex-row">
                            <SelectField
                                form={form}
                                name="vat_rate"
                                label="VAT"
                                selectOptions={Object.values(VAT_RATE).map((val) => ({ label: `${val}%`, value: val }))}
                            />
                            <SelectField
                                form={form}
                                name="measure_unit"
                                label="Jednostka miary"
                                selectOptions={Object.values(MEASURE_UNIT).map((val) => ({ label: val, value: val }))}
                            />
                        </div>

                        <div className="w-full text-right">
                            <Button type="submit" className="w-full sm:w-auto" size="lg">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
