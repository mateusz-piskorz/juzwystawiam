import { InputField } from '@/components/common/form-fields/input-field';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from '@/lib/hooks/use-locale';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
    first_name: z.string().nonempty(),
    phone: z.string().optional(),
    email: z.string().email(),
    message: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

export const ContactForm = () => {
    const l = useLocale().locale;
    const locale = { common: l.common, ...l.root };

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(formData: Schema) {
        console.log(formData);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success('success');
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            console.error(errorMessage);
            toast.error(errorMessage || locale.common['something went wrong']);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={(event) => {
                    event.stopPropagation();
                    form.handleSubmit(onSubmit)(event);
                }}
                className="space-y-5"
            >
                <h4 className="text-xl font-medium">{locale['You can also send a message using form below']}</h4>

                <InputField form={form} name="first_name" label={locale['First name']} />
                <div className="flex flex-col gap-4 md:flex-row">
                    <InputField form={form} name="phone" label={`${locale.Phone} (${locale.common.Optional})`} />
                    <InputField form={form} name="email" label="E-mail" />
                </div>
                {/* todo: consider making reusable textarea */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Textarea
                                    placeholder={locale.Message}
                                    className="h-[200px] resize-none border-2"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="w-full text-right">
                    <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={form.formState.isSubmitting}>
                        {locale.common.Submit}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
