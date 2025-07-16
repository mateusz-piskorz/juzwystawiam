import { InputField } from '@/components/common/input-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { sendEmailIssuingInvoice } from '@/lib/data/invoices';
import { getErrorMessage } from '@/lib/utils/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    recipient: z.string().email().nonempty(),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
    defaultValues?: FormSchema;
    invoiceId: number;
    open: boolean;
    setOpen: (val: boolean) => void;
};

export const SendEmailDialog = ({ invoiceId, defaultValues, open, setOpen }: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async ({ recipient }: FormSchema) => {
        try {
            const response = await sendEmailIssuingInvoice({ invoiceId, body: { recipient } });
            toast.success(response.message);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage || 'something went wrong');
            console.error(errorMessage);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Send email</DialogTitle>
                    <DialogDescription>Fill in the recipient to send email to, invoice will be placed under attachments</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(onSubmit)(event);
                        }}
                        className="space-y-5"
                    >
                        <InputField form={form} name="recipient" label="Recipient" />

                        <div className="w-full text-right">
                            <Button type="submit" className="w-full sm:w-auto" size="lg">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
