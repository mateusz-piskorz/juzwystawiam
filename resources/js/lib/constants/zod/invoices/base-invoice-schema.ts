import { z } from 'zod';
import { ContractorRole } from '../../enums/contractor-role';
import { Currency } from '../../enums/currency';
import { InvoiceType } from '../../enums/invoice-type';
import { MEASURE_UNIT } from '../../enums/measure-unit';
import { PaymentMethod } from '../../enums/payment-method';

export const invoiceProduct = z.object({
    id: z.number().min(1).optional(),
    name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    price: z.coerce.number().min(0),
    measure_unit: z.nativeEnum(MEASURE_UNIT),
    discount: z.coerce.number().min(0).optional(),
});

export const saleAndDueSchema = z.object({
    sale_date: z.date({
        required_error: 'Sale Date is required.',
    }),
    due_date: z.date({
        required_error: 'Due Date is required.',
    }),
});
export type SaleAndDueSchema = z.infer<typeof saleAndDueSchema>;

export const paymentSchema = z.object({
    payment_method: z.nativeEnum(PaymentMethod, { required_error: 'Payment method is required' }),
    currency: z.nativeEnum(Currency, { required_error: 'Currency method is required' }),
    is_already_paid: z.boolean(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;

export const secretNoteSchema = z.object({
    secret_note: z
        .string()
        .min(1, {
            message: 'Secret note must be at least 1 character.',
        })
        .max(450, {
            message: 'Secret note must not be longer than 450 characters.',
        })
        .optional(),
});

export type SecretNoteSchema = z.infer<typeof secretNoteSchema>;

export const numberAndDateSchema = z.object({
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.date({ required_error: 'Issue date is required' }),
});
export type NumberAndDateSchema = z.infer<typeof numberAndDateSchema>;

export const contractorsSchema = z.object({
    invoice_contractors: z.array(z.object({ id: z.number().min(1), role: z.nativeEnum(ContractorRole) })),
});
export type ContractorsSchema = z.infer<typeof contractorsSchema>;

export const baseInvoiceSchema = z.object({
    type: z.nativeEnum(InvoiceType, { required_error: 'Invoice type is required' }),
    ...numberAndDateSchema.shape,
    ...paymentSchema.shape,
    ...saleAndDueSchema.shape,
    ...secretNoteSchema.shape,
    ...contractorsSchema.shape,
    invoice_products: z.array(invoiceProduct).min(1, 'At least one item is required'),
});

export type BaseInvoiceSchema = z.infer<typeof baseInvoiceSchema>;
