/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { api } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { Nullable } from '@/lib/types/nullable';
import { TypedFieldPath } from '@/lib/types/typed-field-path';
import { cn } from '@/lib/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldType = Nullable<number>;

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: TypedFieldPath<T, FieldType>;
    disabled?: boolean;
    className?: string;
    classNameInput?: string;
    placeholder?: string;
};

export const ExpenseTypesSelectField = <T extends FieldValues>({ form, name, disabled, className, classNameInput, placeholder }: Props<T>) => {
    const locale = useLocale().locale['dashboard/expense-types'];

    const [open, setOpen] = React.useState(false);
    const { control } = form as unknown as UseFormReturn<{ [x: string]: FieldType }>;
    const [q, setQ] = React.useState('');

    const { data } = useQuery({
        queryKey: ['expense-type-list', q],
        queryFn: () =>
            api['expense-types.index']({
                queries: {
                    limit: 12,
                    q,
                },
            }).then((res) => res.data.map((et) => ({ ...et, label: et.name, value: et.id }))),
    });

    const debouncedSetQ = React.useCallback(
        debounce((q) => setQ(q), 400),
        [],
    );

    const hasOptions = data && data.length > 0;

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (disabled) setOpen(false);
    }, [disabled]);

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <FormItem
                            className={cn(
                                'hover:bg-accent relative z-10 block h-[60px] w-full min-w-[100px] rounded border',
                                'outline-[var(--accent-foreground)] focus-within:outline focus-within:outline-solid',
                                className,
                            )}
                        >
                            <FormLabel
                                className={cn(
                                    'text-muted-foreground',
                                    'absolute top-1/2 left-3 -translate-y-1/2',
                                    field.value && 'top-[18px] text-xs',
                                )}
                            >
                                {locale['Expense Type']}
                            </FormLabel>
                            <FormControl>
                                <Popover open={hasOptions ? open : false} onOpenChange={setOpen}>
                                    <PopoverAnchor asChild>
                                        <Input
                                            autoComplete="off"
                                            className={cn('h-full border-none', field.value && 'pt-5', classNameInput)}
                                            {...field}
                                            ref={inputRef}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                debouncedSetQ(e.target.value);
                                            }}
                                            disabled={disabled}
                                            placeholder={placeholder}
                                            value={field.value || ''}
                                            role="combobox"
                                            aria-expanded={open}
                                            onFocus={() => {
                                                if (!open) {
                                                    setOpen(true);
                                                }
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        />
                                    </PopoverAnchor>

                                    <PopoverContent
                                        sideOffset={8}
                                        style={{ width: 'var(--radix-popover-trigger-width)' }}
                                        className="p-0"
                                        onInteractOutside={(e) => {
                                            if (inputRef.current && inputRef.current.contains(e.target as Node)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                    >
                                        <Command>
                                            <CommandList>
                                                <CommandGroup>
                                                    {data?.map((expenseType) => (
                                                        <CommandItem
                                                            className="flex justify-between"
                                                            key={expenseType.id}
                                                            value={String(expenseType.id)}
                                                            onSelect={() => {
                                                                field.onChange(expenseType.id);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <p className="truncate">{expenseType.name}</p>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>
                    );
                }}
            />
        </>
    );
};
