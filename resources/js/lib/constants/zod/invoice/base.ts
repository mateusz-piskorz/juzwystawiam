import { z } from 'zod';
import { CONTRACTOR_ROLE } from '../../enums/contractor-role';
import { CURRENCY } from '../../enums/currency';
import { INVOICE_TYPE } from '../../enums/invoice-type';
import { MEASURE_UNIT } from '../../enums/measure-unit';
import { PAYMENT_METHOD } from '../../enums/payment-method';

export const invoiceProductBase = z.object({
    product_id: z.number().min(1).nullish(),
    name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    price: z.coerce.number().min(0),
    measure_unit: z.nativeEnum(MEASURE_UNIT),
    discount: z.coerce.number().min(0).nullish(),
});

//todo: check if validation pass after you type in field and then remove everything
export const invoiceSchemaBase = z.object({
    type: z.nativeEnum(INVOICE_TYPE),
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.date({ required_error: 'Issue date is required' }),
    payment_method: z.nativeEnum(PAYMENT_METHOD),
    currency: z.nativeEnum(CURRENCY),
    is_already_paid: z.boolean(),
    sale_date: z.date(),
    due_date: z.date(),
    secret_note: z.string().max(800).nullish(),
    invoice_contractors: z.array(z.object({ contractor_id: z.number().min(1), role: z.nativeEnum(CONTRACTOR_ROLE) })),
    invoice_products: z.array(invoiceProductBase).min(1),
});
