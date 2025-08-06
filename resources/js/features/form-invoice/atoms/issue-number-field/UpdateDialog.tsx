import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ issue_number: z.string().min(1, 'issue number is required') });
type Schema = z.infer<typeof schema>;

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues: Schema;
    onSubmit: (val: Schema) => void;
};

export const UpdateDialog = ({ open, setOpen, defaultValues, onSubmit }: Props) => {
    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const submitHandler = (val: Schema) => {
        setOpen(false);
        onSubmit(val);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-full space-y-5 overflow-auto">
                <DialogHeader>
                    <DialogTitle>Update Issue Number</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation();
                            form.handleSubmit(submitHandler)(event);
                        }}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="issue_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice Issue Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? ''} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
