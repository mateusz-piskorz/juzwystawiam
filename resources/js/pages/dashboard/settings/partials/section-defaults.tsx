import { DashboardHeading } from '@/components/common/dashboard-heading';
import { ContractorsSelectField } from '@/components/common/form-fields/contractors-select-field';
import { SelectField } from '@/components/common/form-fields/select-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function SectionDefaults() {
    const page = usePage<{ mustVerifyEmail: boolean; status?: string }>();
    const { user } = page.props.auth;

    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'].defaults, common: l.common };

    const form = useForm({
        resolver: zodResolver(schemas.profile_update_defaults_Body.strip()),
        defaultValues: {
            default_currency: user.default_currency,
            default_payment_method: user.default_payment_method,
            default_seller_id: user.default_seller_id,
        },
    });

    const submitHandler = async (data: z.infer<typeof schemas.profile_update_defaults_Body>) => {
        try {
            const res = await api['profile.update-defaults'](data);
            if (res.success) {
                toast.success(locale.common.Saved);
            } else {
                toast.success(locale.common['something went wrong']);
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error(errorMessage);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
    };

    console.log(form.formState.errors);

    return (
        <div className="px-4 md:px-8">
            <DashboardHeading
                className="mb-8"
                title={locale['Default settings']}
                description={locale['Update your default settings, these will be pre-filled when creating invoices']}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                    <SelectField
                        form={form}
                        name="default_payment_method"
                        label={locale.common['Payment method']}
                        selectOptions={schemas.PaymentMethod.options.map((val) => ({ label: val, value: val }))}
                    />

                    <SelectField
                        form={form}
                        name="default_currency"
                        label={locale.common['Currency']}
                        selectOptions={schemas.Currency.options.map((val) => ({ label: val, value: val }))}
                    />

                    <ContractorsSelectField form={form} label="Seller" role="SELLER" name="default_seller_id" />

                    <Button disabled={form.formState.isSubmitting}>{locale['Save Defaults']}</Button>
                </form>
            </Form>
        </div>
    );
}
