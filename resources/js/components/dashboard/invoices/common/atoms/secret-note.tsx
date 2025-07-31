import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InvoiceSchema } from '@/lib/constants/zod/invoice';
import { useLocale } from '@/lib/hooks/use-locale';
import { usePremium } from '@/lib/hooks/use-premium';
import { cn } from '@/lib/utils/cn';
import { CircleAlert } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    form: UseFormReturn<InvoiceSchema>;
    className?: string;
};

// todo: tooltip is not working on mobile
export const SecretNote = ({ form, className }: Props) => {
    const locale = useLocale().locale['dashboard/invoices']['invoice-form'];
    const { hasPremium } = usePremium();

    return (
        <FormField
            disabled={!hasPremium}
            control={form.control}
            name="secret_note"
            render={({ field }) => (
                <FormItem className={cn('relative w-full min-w-[200px]', className)}>
                    <FormControl>
                        <Textarea
                            placeholder={locale['A secret note for Your invoice']}
                            className="h-[123px] resize-none"
                            {...field}
                            value={field.value || ''}
                        />
                    </FormControl>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" className="absolute top-1 right-2" type="button">
                                <span className="sr-only">{locale['Information about secret note']}</span>
                                <CircleAlert />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-sm font-normal">
                                {locale['Secret note visible only to you. This feature is for']}{' '}
                                <span className="text-orange-400">{locale['premium users']}</span>
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </FormItem>
            )}
        />
    );
};
