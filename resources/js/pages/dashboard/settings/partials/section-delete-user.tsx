import { Button } from '@/components/ui/button';

import { DashboardHeading } from '@/components/common/dashboard-heading';
import { InputField } from '@/components/common/form-fields/input-field';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { DeleteAccountDTO, deleteAccountDTO } from '@/lib/constants/zod/profile';
import { deleteAccount } from '@/lib/data/profile';
import { useLocale } from '@/lib/hooks/use-locale';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SectionDeleteUser() {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'].profile, common: l.common };

    const form = useForm<DeleteAccountDTO>({
        resolver: zodResolver(deleteAccountDTO),
    });

    const submitHandler = async (data: DeleteAccountDTO) => {
        try {
            await deleteAccount(data);
            toast.success(locale.common.Saved);
            router.visit('/');
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
                title={locale['Delete account']}
                description={locale['Delete your account and all of its resources']}
                size="small"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">{locale.Warning}</p>
                    <p className="text-sm">{locale['Please proceed with caution, this cannot be undone.']}</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">{locale['Delete account']}</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>{locale['delete-user-dialog']['Are you sure you want to delete your account?']}</DialogTitle>
                        <DialogDescription>
                            {
                                locale['delete-user-dialog'][
                                    'Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.'
                                ]
                            }
                        </DialogDescription>
                        <Form {...form}>
                            <form
                                className="space-y-6"
                                onSubmit={(event) => {
                                    event.stopPropagation();
                                    form.handleSubmit(submitHandler)(event);
                                }}
                            >
                                <InputField form={form} name="password" label={locale['delete-user-dialog'].Password} type="password" />

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">{locale.common.Cancel}</Button>
                                    </DialogClose>

                                    <Button variant="destructive" disabled={form.formState.isSubmitting} type="submit">
                                        {locale['Delete account']}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
