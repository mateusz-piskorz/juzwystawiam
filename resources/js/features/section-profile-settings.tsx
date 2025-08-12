import { DashboardHeading } from '@/components/common/dashboard-heading';

import InputError from '@/components/common/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type ProfileForm = {
    name: string;
    email: string;
};

// todo: add logout button if missing
export function SectionProfileSettings() {
    const page = usePage<{ mustVerifyEmail: boolean; status?: string }>();
    const { user } = page.props.auth;
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'].profile, common: l.common };

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <div className="px-4 md:px-8">
            <DashboardHeading className="mb-8" title={locale['Profile information']} description={locale['Update your name and email address']} />

            <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">{locale.Name}</Label>

                    <Input
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Full name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">{locale['Email address']}</Label>

                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Email address"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

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

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>{locale.Save}</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">{locale.common.Saved}</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
