import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TypedFieldPath } from '@/lib/types/typed-field-path';
import { cn } from '@/lib/utils/cn';
import { differenceInDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldType = Date;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;

    className?: React.HTMLAttributes<'div'>['className'];
    saleDate?: Date | undefined;
    label: string;
};

export const CalendarField = <T extends FieldValues>({ form, name: propsName, saleDate, label, className }: Props<T>) => {
    const name = propsName as string;
    const [open, setOpen] = useState(false);
    const { control } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        'hover:bg-accent flex min-w-[100px] flex-col rounded border',
                        'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
                        className,
                    )}
                >
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'rounded hover:bg-transparent',
                                        'h-[60px] justify-start truncate border-none bg-transparent pl-3 text-left font-normal',
                                    )}
                                >
                                    {field.value ? (
                                        <div className="flex flex-col gap-1">
                                            <FormLabel className="text-muted-foreground text-xs">{label}</FormLabel>
                                            <p className="text-base">
                                                {format(field.value, 'dd.MM.yyyy')}
                                                {saleDate && (
                                                    <span className="text-muted-foreground ml-2 text-xs">
                                                        ({differenceInDays(field.value, saleDate || new Date())} dni)
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    ) : (
                                        <FormLabel className="text-muted-foreground">{label}</FormLabel>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(val) => {
                                    field.onChange(val);
                                    setOpen(false);
                                }}
                                disabled={(date) => date < new Date('1900-01-01')}
                                captionLayout="dropdown"
                                today={saleDate}
                            />
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />
    );
};
