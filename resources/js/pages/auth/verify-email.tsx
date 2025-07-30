import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/default/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { useLocale } from '@/lib/hooks/use-locale';

export default function VerifyEmail({ status }: { status?: string }) {
    const locale = useLocale().locale.auth;
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title={locale['Verify email']}
            description={locale['Please verify your email address by clicking on the link we just emailed to you']}
        >
            <Head title={locale['Email verification']} />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {locale['A new verification link has been sent to the email address you provided during registration']}.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {locale['Resend verification email']}
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    {locale['Log out']}
                </TextLink>
            </form>
        </AuthLayout>
    );
}
