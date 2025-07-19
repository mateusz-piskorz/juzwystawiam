import ConfirmDialog from '@/components/common/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteInvoice } from '@/lib/data/invoices';
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

export const InvoiceActionsSection = ({ invoiceId, buyerEmail }: Props) => {
    const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);
    const [openEmailSendingDialog, setOpenEmailSendingDialog] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await deleteInvoice({ invoiceId });
            toast.success(response.message);
            router.visit(`/dashboard/invoices`);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage || 'something went wrong');
            console.error(errorMessage);
        }
        setOpenRemoveConfirm(false);
    };

    return (
        <>
            <div>
                <h1 className="mb-2 text-xl font-medium">Actions</h1>
                <div className="space-x-4">
                    <Button variant="secondary">
                        <a href={`/dashboard/invoices/${invoiceId}/pdf-preview`} target="_blank">
                            Preview
                        </a>
                    </Button>
                    <Button variant="secondary">
                        <a href={`/dashboard/invoices/${invoiceId}/pdf-download`} target="_blank">
                            Download
                        </a>
                    </Button>
                    <Button variant="secondary" onClick={() => setOpenEmailSendingDialog(true)}>
                        Send email
                    </Button>
                    <Button variant="secondary">
                        <Link href={`/dashboard/invoices/${invoiceId}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" onClick={() => setOpenRemoveConfirm(true)}>
                        Delete this invoice
                    </Button>
                </div>
            </div>
            <ConfirmDialog open={openRemoveConfirm} setOpen={setOpenRemoveConfirm} onContinue={handleDelete} title="Remove invoice" />
            <SendEmailDialog
                open={openEmailSendingDialog}
                setOpen={setOpenEmailSendingDialog}
                invoiceId={invoiceId}
                defaultValues={buyerEmail ? { recipient: buyerEmail } : undefined}
            />
        </>
    );
};
