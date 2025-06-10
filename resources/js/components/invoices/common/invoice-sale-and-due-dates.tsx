'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';
import { SaleAndDueSchema } from '@/lib/zod/invoices/base-invoice-schema';
import { differenceInDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type RequiredFields = SaleAndDueSchema;

type Props<T extends RequiredFields = RequiredFields> = {
    form: UseFormReturn<T>;
};

export const InvoiceSaleAndDueDates = <T extends RequiredFields = RequiredFields>({ form }: Props<T>) => {
    const [open, setOpen] = useState(false);
    const { control, watch } = form as unknown as UseFormReturn<SaleAndDueSchema>;

    const saleDate = watch('sale_date');

    return (
        <div className="rounded border">
            <FormField
                control={control}
                name="sale_date"
                render={({ field }) => (
                    <FormItem className="hover:bg-accent flex flex-col">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'h-[60px] justify-start truncate rounded-none rounded-ss rounded-se border-0 bg-transparent pl-3 text-left font-normal outline-[var(--accent-foreground)] focus-visible:ring-0 focus-visible:outline focus-visible:outline-solid',
                                        )}
                                    >
                                        {field.value ? (
                                            <div className="flex flex-col gap-1">
                                                <FormLabel className="text-muted-foreground text-xs">Data sprzedaży</FormLabel>
                                                <p className="text-base">{format(field.value, 'dd.MM.yyyy')}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <FormLabel className="text-muted-foreground">Data sprzedaży</FormLabel>
                                            </>
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
                    <FormItem className="hover:bg-accent flex flex-col">
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'h-[60px] justify-start truncate rounded-none rounded-ee rounded-es border-0 bg-transparent pl-3 text-left font-normal outline-[var(--accent-foreground)] focus-visible:ring-0 focus-visible:outline focus-visible:outline-solid',
                                        )}
                                    >
                                        {field.value ? (
                                            <div className="flex flex-col gap-1">
                                                <FormLabel className="text-muted-foreground text-xs">Termin zapłaty</FormLabel>
                                                <p className="text-base">
                                                    {format(field.value, 'dd.MM.yyyy')}
                                                    <span className="text-muted-foreground ml-2 text-xs">
                                                        ({differenceInDays(field.value, saleDate || new Date())} dni)
                                                    </span>
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <FormLabel className="text-muted-foreground">Termin zapłaty</FormLabel>
                                            </>
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
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
