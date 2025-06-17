import { SelectField } from '@/components/common/select-field';
import { SwitchField } from '@/components/common/switch-field';
import { Separator } from '@/components/ui/separator';
import { CURRENCIES } from '@/lib/constants/currencies';
import { PaymentMethod } from '@/lib/constants/enums/payment-method';
import { PaymentSchema } from '@/lib/constants/zod/invoices/base-invoice-schema';
import { cn } from '@/lib/utils/cn';
import { UseFormReturn } from 'react-hook-form';

type Props<T extends PaymentSchema> = {
    form: UseFormReturn<T>;
    className?: string;
};

export const PaymentTripleBox = <T extends PaymentSchema>({ form: propsForm, className }: Props<T>) => {
    const form = propsForm as unknown as UseFormReturn<PaymentSchema>;
    return (
        <div className={cn('w-full min-w-[200px] rounded border', className)}>
            <div className="flex h-[60px]">
                <SelectField
                    form={form}
                    name="payment_method"
                    label="Sposób płatności"
                    selectOptions={Object.values(PaymentMethod).map((val) => ({ label: val, value: val }))}
                    className="flex-2/3 rounded-none"
                    // buttonClassName="rounded-none rounded-ss border-none"
                />

                <Separator orientation="vertical" />

                <SelectField
                    form={form}
                    name="currency"
                    label="Waluta"
                    selectOptions={CURRENCIES.map((val) => ({ label: val, value: val }))}
                    className="flex-1/3 rounded-none"
                    // buttonClassName="rounded-none rounded-se border-none"
                />
            </div>

            <Separator orientation="horizontal" />

            <SwitchField
                form={form}
                name="is_already_paid"
                className="rounded-none rounded-ee rounded-es border-none"
                label="Faktura opłacona"
                description="Oznacz fakturę jako opłaconą"
            />
        </div>
    );
};
