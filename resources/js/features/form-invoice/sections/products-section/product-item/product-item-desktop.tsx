import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form';
import { ProductSelectField } from '../../../atoms/product-select-field';

import { CurrencyField } from '@/components/common/form-fields/currency-field';
import { InputField } from '@/components/common/form-fields/input-field';
import { SelectField } from '@/components/common/form-fields/select-field';
import { Separator } from '@/components/ui/separator';
import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { useLocale } from '@/lib/hooks/use-locale';
import { RemoveItemButton } from './remove-item-button';

type Props<T extends InvoiceSchema> = {
    form: UseFormReturn<T>;
    idx: number;
    remove: UseFieldArrayRemove;
    fieldsLength: number;
    total: string;
};

export const ProductItemDesktop = <T extends InvoiceSchema>({ form: formProps, idx, remove, fieldsLength, total }: Props<T>) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices']['invoice-form'], common: l.common, enum: l.enum };

    const form = formProps as unknown as UseFormReturn<InvoiceSchema>;
    const formType = form.watch('type');

    return (
        <div className="m-[2px] flex items-center gap-4">
            <ProductSelectField form={form} idx={idx} />

            <div className="flex h-[61px] rounded-sm border xl:min-w-[700px]">
                <CurrencyField
                    form={form}
                    name={`invoice_products.${idx}.price`}
                    label={locale.Price}
                    className="rounded-none rounded-ss rounded-es border-none"
                />
                <Separator orientation="vertical" />
                <InputField
                    form={form}
                    name={`invoice_products.${idx}.quantity`}
                    label={locale.Quantity}
                    type="number"
                    inputMode="numeric"
                    className="rounded-none border-none"
                />
                <Separator orientation="vertical" />
                {formType === INVOICE_TYPE.VAT && (
                    <SelectField
                        form={form}
                        name={`invoice_products.${idx}.vat_rate`}
                        label={locale.common['Vat rate']}
                        selectOptions={Object.values(VAT_RATE).map((val) => ({ label: `${val}%`, value: val }))}
                        className="rounded-none border-none"
                    />
                )}
                <Separator orientation="vertical" />
                <InputField
                    form={form}
                    name={`invoice_products.${idx}.discount`}
                    label={`${locale.Discount} %`}
                    type="number"
                    inputMode="numeric"
                    className="rounded-none border-none"
                />
                <Separator orientation="vertical" />
                <SelectField
                    form={form}
                    name={`invoice_products.${idx}.measure_unit`}
                    label={locale.common['Measure Unit']}
                    selectOptions={Object.values(MEASURE_UNIT).map((val) => ({ label: locale.enum.MEASURE_UNIT[val], value: val }))}
                    className="rounded-none rounded-se rounded-ee border-none"
                />
            </div>
            <RemoveItemButton disabled={fieldsLength <= 1} onRemove={() => remove(idx)} total={total} />
        </div>
    );
};
