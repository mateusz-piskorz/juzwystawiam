import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { SecretNoteSchema } from '@/lib/constants/zod/invoices/base-invoice-schema';
import { cn } from '@/lib/utils/cn';
import { UseFormReturn } from 'react-hook-form';

type Props<T extends SecretNoteSchema> = {
    form: UseFormReturn<T>;
    className?: string;
};

export const SecretNote = <T extends SecretNoteSchema>({ form, className }: Props<T>) => {
    const { control } = form as unknown as UseFormReturn<SecretNoteSchema>;
    return (
        <FormField
            control={control}
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
