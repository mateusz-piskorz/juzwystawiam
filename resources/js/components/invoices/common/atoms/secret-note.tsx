import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CreateInvoiceDTO } from '@/lib/constants/zod/invoices';
import { cn } from '@/lib/utils/cn';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<CreateInvoiceDTO>;
    className?: string;
};

export const SecretNote = ({ form, className }: Props) => {
    return (
        <FormField
            control={form.control}
            name="secret_note"
            render={({ field }) => (
                <FormItem className={cn('w-full min-w-[200px]', className)}>
                    <FormControl>
                        <Textarea placeholder="A secret note for Your invoice" className="h-[123px] resize-none" {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
