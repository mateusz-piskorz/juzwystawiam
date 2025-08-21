import ConfirmDialog from '@/components/common/confirm-dialog';
import { DashboardHeading } from '@/components/common/dashboard-heading';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { Nullable } from '@/lib/types/nullable';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { SendEmailDialog } from './send-email-dialog';

type Props = {
    invoiceId: number;
    buyerEmail: Nullable<string>;
};

export const SectionInvoiceActions = ({ invoiceId, buyerEmail }: Props) => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/invoices'], common: l.common };
    const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);
    const [openEmailSendingDialog, setOpenEmailSendingDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await api['invoices.destroy'](undefined, { params: { invoice: invoiceId } });
            toast.success(locale['Invoice deleted successfully']);
            router.visit(`/dashboard/invoices`);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage || locale.common['something went wrong']);
            console.error(errorMessage);
        }
        setOpenRemoveConfirm(false);
    };

    return (
        <>
            <div className="px-4 md:px-8">
                <DashboardHeading title={locale.Actions} description={locale['Perform key actions for this invoice']} />
                <div className="space-y-4 space-x-4">
                    <Button variant="secondary">
                        <a href={route('invoices.pdf-preview', invoiceId)} target="_blank">
                            {locale.Preview}
                        </a>
                    </Button>
                    <Button variant="secondary">
                        <a href={route('invoices.pdf-download', invoiceId)} target="_blank">
                            {locale.Download}
                        </a>
                    </Button>
                    <Button variant="secondary" onClick={() => setOpenEmailSendingDialog(true)}>
                        {locale['Send email']}
                    </Button>
                    <Button variant="secondary">
                        <Link href={route('invoices.edit', invoiceId)}>{locale['Edit invoice']}</Link>
                    </Button>
                    <Button variant="destructive" onClick={() => setOpenRemoveConfirm(true)}>
                        {locale['Delete invoice']}
                    </Button>
                </div>
            </div>
            <ConfirmDialog
                open={openRemoveConfirm}
                setOpen={setOpenRemoveConfirm}
                onContinue={handleDelete}
                title={locale['Are you sure you want to remove this Invoice']}
                description={locale['This action cannot be undone. Invoice will be permanently deleted.']}
            />
            <SendEmailDialog
                open={openEmailSendingDialog}
                setOpen={setOpenEmailSendingDialog}
                invoiceId={invoiceId}
                defaultValues={buyerEmail ? { recipient: buyerEmail } : undefined}
            />
        </>
    );
};
