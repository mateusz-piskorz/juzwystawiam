import { SelectField } from '@/components/common/form-fields/select-field';
import { SwitchField } from '@/components/common/form-fields/switch-field';
import { Separator } from '@/components/ui/separator';
import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/utils/cn';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<InvoiceSchema>;
    className?: string;
};

export const PaymentTripleBox = ({ form, className }: Props) => {
    const locale = useLocale().locale['dashboard/invoices']['invoice-form'];

    return (
        <div className={cn('w-full min-w-[200px] rounded border', className)}>
            <div className="flex h-[60px]">
                <SelectField
                    form={form}
                    name="payment_method"
                    label={locale['Payment method']}
                    selectOptions={schemas.PaymentMethod.options.map((val) => ({ label: val, value: val }))}
                    className="flex-2/3 rounded-none rounded-ss border-none"
                />

                <Separator orientation="vertical" />

                <SelectField
                    form={form}
                    name="currency"
                    label={locale.Currency}
                    selectOptions={schemas.Currency.options.map((val) => ({ label: val, value: val }))}
                    className="flex-1/3 rounded-none rounded-se border-none"
                />
            </div>

            <Separator orientation="horizontal" />

            <SwitchField
                form={form}
                name="is_already_paid"
                className="rounded-none rounded-ee rounded-es border-none"
                label={locale['Invoice paid']}
                description={locale['Mark invoice as paid']}
            />
        </div>
    );
};
