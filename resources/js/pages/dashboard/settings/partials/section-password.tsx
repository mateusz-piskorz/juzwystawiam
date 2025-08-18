import { DashboardHeading } from '@/components/common/dashboard-heading';
import { InputField } from '@/components/common/form-fields/input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { UpdatePasswordDTO, updatePasswordDTO } from '@/lib/constants/zod/profile';
import { updatePassword } from '@/lib/data/profile';
import { useLocale } from '@/lib/hooks/use-locale';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SectionPassword() {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'].password, common: l.common };

    const form = useForm<UpdatePasswordDTO>({
        resolver: zodResolver(updatePasswordDTO),
    });

    const submitHandler = async (data: UpdatePasswordDTO) => {
        try {
            await updatePassword(data);
            toast.success(locale.common.Saved);
            form.reset();
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error(errorMessage);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
    };

    return (
        <div className="px-4 md:px-8">
            <DashboardHeading
                className="mb-8"
                title={locale['Update password']}
                description={locale['Ensure your account is using a long, random password to stay secure']}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                    <InputField form={form} name="current_password" label={locale['Current password']} type="password" />
                    <InputField form={form} name="password" label={locale['New password']} type="password" />
                    <InputField form={form} name="password_confirmation" label={locale['Confirm password']} type="password" />

                    <Button disabled={form.formState.isSubmitting}>{locale['Save password']}</Button>
                </form>
            </Form>
        </div>
    );
}
