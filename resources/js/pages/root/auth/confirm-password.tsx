import InputError from '@/components/common/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/root/auth-layout';
import { useLocale } from '@/lib/hooks/use-locale';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const locale = useLocale().locale.auth;
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title={locale['Confirm your password']}
            description={locale['This is a secure area of the application. Please confirm your password before continuing']}
        >
            <Head title={locale['Confirm password']} />

            <form onSubmit={submit}>
                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">{locale.Password}</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder={locale.Password}
                            autoComplete="current-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {locale['Confirm password']}
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
