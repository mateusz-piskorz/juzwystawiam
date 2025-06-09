'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';
import { SaleAndDueSchema } from '@/lib/zod/invoices/base-invoice-schema';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

type RequiredFields = SaleAndDueSchema;

type Props<T extends RequiredFields = RequiredFields> = {
    form: UseFormReturn<T>;
};

export const InvoiceSaleAndDueDates = <T extends RequiredFields = RequiredFields>({ form }: Props<T>) => {
    const { control } = form as unknown as UseFormReturn<SaleAndDueSchema>;

    return (
        <div className="rounded border">
            <FormField
                control={control}
                name="sale_date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        {/* <FormLabel>Date of birth</FormLabel> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn('h-[56px] border-0 pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                    >
                                        {field.value ? format(field.value, 'dd.MM.yyyy') : <span>Data sprzedaży</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator />

            <FormField
                control={control}
                name="due_date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        {/* <FormLabel>Date of birth</FormLabel> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn('h-[56px] border-0 pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                    >
                                        {field.value ? (
                                            format(field.value, 'dd.MM.yyyy')
                                        ) : (
                                            <div className="pr- flex w-full justify-between">
                                                <span>Termin zapłaty</span>
                                                <span>12 dni</span>
                                            </div>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date('1900-01-01')}
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
