import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { z } from 'zod';

export const invoiceProductBase = z.object({
    product_id: z.number().min(1).nullish(),
    name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    price: z.coerce.number().min(0),
    measure_unit: schemas.MeasureUnit,
    discount: z.coerce.number().min(0).nullish(),
});
// const stringToDate = z.string().pipe(z.coerce.date());
export const invoiceSchemaBase = z.object({
    type: schemas.InvoiceType,
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.date({ required_error: 'Issue date is required' }),
    payment_method: schemas.PaymentMethod,
    currency: schemas.Currency,
    is_already_paid: z.boolean(),
    sale_date: z.date(),
    due_date: z.date(),
    secret_note: z.string().max(800).nullish(),
    invoice_contractors: z.array(z.object({ contractor_id: z.number().min(1), role: schemas.ContractorRole })),
    invoice_products: z.array(invoiceProductBase).min(1),
});
