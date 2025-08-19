import { CurrencyField } from '@/components/common/form-fields/currency-field';
import { InputField } from '@/components/common/form-fields/input-field';
import { SelectField } from '@/components/common/form-fields/select-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { createProductDTO, CreateProductDTO } from '@/lib/constants/zod/product';
import { upsertProduct } from '@/lib/data/products';
import { useLocale } from '@/lib/hooks/use-locale';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: Partial<CreateProductDTO>;
    productId?: number;
    onSuccess?: () => void;
};

const initialDefaultValue = {
    vat_rate: VAT_RATE.CASE23,
    price: 0,
};

export const UpsertProductDialog = ({ open, setOpen, defaultValues, productId, onSuccess }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/products'], common: l.common, enum: l.enum };

    const form = useForm<CreateProductDTO>({
        resolver: zodResolver(createProductDTO),
        defaultValues: defaultValues || initialDefaultValue,
    });

    useEffect(() => {
        form.reset(defaultValues ?? initialDefaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(body: CreateProductDTO) {
        try {
            await upsertProduct({ body, productId });
            toast.success(`${locale.Product} ${productId ? locale.common.Updated : locale.common.Created} ${locale.common.Successfully}`);
            onSuccess?.();
            setOpen(false);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            console.log(errorMessage);
            console.error(errorMessage);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{productId ? 'Update' : 'Create'} Product</DialogTitle>
                    <DialogDescription>
                        {locale.common['Fill in the details below to']}
                        {productId ? locale.common.Updated : locale.common.Created} {locale.Product}.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(onSubmit)(event);
                        }}
                        className="space-y-5"
                    >
                        <InputField form={form} name="name" label={locale['Product name']} />
                        {/* todo: consider making reusable textarea */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder={locale['Product description']}
                                            className="h-[123px] resize-none"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <CurrencyField form={form} name="price" label={`${locale.Product} ${locale.Price}`} />

                        <div className="flex w-full flex-col gap-5 sm:flex-row">
                            <SelectField
                                form={form}
                                name="vat_rate"
                                label="VAT"
                                selectOptions={schemas.VatRate.options.map((val) => ({ label: `${val}%`, value: val }))}
                            />
                            <SelectField
                                form={form}
                                name="measure_unit"
                                label={locale.common['Measure Unit']}
                                selectOptions={schemas.MeasureUnit.options.map((val) => ({ label: locale.enum.MEASURE_UNIT[val], value: val }))}
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
