import { z } from 'zod';
import { CONTRACTOR_ROLE } from '../../enums/contractor-role';
import { Currency } from '../../enums/currency';
import { INVOICE_TYPE } from '../../enums/invoice-type';
import { MEASURE_UNIT } from '../../enums/measure-unit';
import { PaymentMethod } from '../../enums/payment-method';

export const invoiceProduct = z.object({
    product_id: z.number().min(1).nullish(),
    name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    price: z.coerce.number().min(0),
    measure_unit: z.nativeEnum(MEASURE_UNIT),
    discount: z.coerce.number().min(0).nullish(),
});

export const baseInvoiceSchema = z.object({
    type: z.nativeEnum(INVOICE_TYPE),
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.date({ required_error: 'Issue date is required' }),
    payment_method: z.nativeEnum(PaymentMethod),
    currency: z.nativeEnum(Currency),
    is_already_paid: z.boolean(),
    sale_date: z.date(),
    due_date: z.date(),
    secret_note: z.string().min(1).max(800).nullish(),
    invoice_contractors: z.array(z.object({ contractor_id: z.number().min(1), role: z.nativeEnum(CONTRACTOR_ROLE) })),
    invoice_products: z.array(invoiceProduct).min(1, 'At least one item is required'),
});

export type BaseInvoiceSchema = z.infer<typeof baseInvoiceSchema>;
