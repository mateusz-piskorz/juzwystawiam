import { DashboardHeading } from '@/components/common/dashboard-heading';
import { InputField } from '@/components/common/form-fields/input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { updateProfileDTO, UpdateProfileDTO } from '@/lib/constants/zod/profile';
import { updateProfile } from '@/lib/data/profile';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SectionProfileSettings() {
    const page = usePage<{ mustVerifyEmail: boolean; status?: string }>();
    const { user } = page.props.auth;
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'].profile, common: l.common };

    const form = useForm<UpdateProfileDTO>({
        resolver: zodResolver(updateProfileDTO),
        defaultValues: { email: user.email, name: user.name },
    });

    const submitHandler = async (data: UpdateProfileDTO) => {
        try {
            await updateProfile(data);
            toast.success(locale.common.Saved);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            console.error(errorMessage);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
    };

    return (
        <div className="px-4 md:px-8">
            <DashboardHeading className="mb-8" title={locale['Profile information']} description={locale['Update your name and email address']} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                    <InputField form={form} name="name" label={locale.Name} />
                    <InputField form={form} name="email" label={locale['Email address']} type="email" />

                    {page.props.mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                {locale['Your email address is unverified.']}{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    {locale['Click here to resend the verification email.']}
                                </Link>
                            </p>

                            {page.props.status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    {locale['A new verification link has been sent to your email address.']}
                                </div>
                            )}
                        </div>
                    )}

                    <Button disabled={form.formState.isSubmitting}>{locale.Save}</Button>
                </form>
            </Form>
        </div>
    );
}
