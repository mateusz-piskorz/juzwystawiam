import { z } from 'zod';
import { schemas } from './openapi.json.client';

const invoiceProduct = z.object({
    product_id: z.number().min(1).nullable().optional(),
    name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    price: z.coerce.number().min(0),
    measure_unit: schemas.MeasureUnit,
    discount: z.coerce.number().min(0).nullable().optional(),
    vat_rate: schemas.VatRate.optional(),
});

export const invoiceSchema = z.object({
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.union([z.string().transform((val) => new Date(val)), z.date()]),
    payment_method: schemas.PaymentMethod,
    currency: schemas.Currency,
    is_already_paid: z.boolean().optional(),
    sale_date: z.union([z.string().transform((val) => new Date(val)), z.date()]),
    due_date: z.union([z.string().transform((val) => new Date(val)), z.date()]),
    secret_note: z.string().max(800).nullish(),
    invoice_contractors: z.array(z.object({ contractor_id: z.number().min(1), role: schemas.ContractorRole })),
    invoice_products: z.array(invoiceProduct).min(1),
});
