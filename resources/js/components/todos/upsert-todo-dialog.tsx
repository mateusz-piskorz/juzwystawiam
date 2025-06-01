import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/utils/api-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    completed: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    defaultValues?: FormSchema;
    todoId?: string;
    refetch: () => void;
};

export const UpsertTodoDialog = ({ open, setOpen, defaultValues, todoId, refetch }: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || { title: '', description: '', completed: false },
    });

    useEffect(() => {
        form.reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues, form.formState.isSubmitSuccessful]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = todoId ? `/api/todos/${todoId}` : '/api/todos';

        const res = await apiFetch(url, { method: todoId ? 'PUT' : 'POST', body: JSON.stringify(values) });

        if (res.ok) {
            toast.success(`Todo ${todoId ? 'updated' : 'created'} successfully`);
            refetch();
            setOpen(false);
        } else {
            toast.error('something went wrong');
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-full overflow-auto">
                <DialogHeader>
                    <DialogTitle>{todoId ? 'Update' : 'Create'} Todo</DialogTitle>
                    <DialogDescription>Fill in the details below to {todoId ? 'update' : 'create'} a todo.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="max-h-[400px] resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Completed</FormLabel>
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
