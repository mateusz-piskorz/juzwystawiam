import { Currency, InvoiceType, PaymentMethod } from '@/lib/constants/invoiceTypes';
import { z } from 'zod';

// when submitting a form we should show that user selected a product or a contractor from his saved list,
// if user gonna change some fields, this should update these fields in a saved product or contractor
// (if many same products we should take last one i think)

// if user not gonna select a contractor or a product, but some fields gonna match with ones in saved list (e.g. contractor.nip/product.name)
// we should prompt user to take an action: 'connect contractor/product from saved | create new contractor/product'

export const invoiceItem = z.object({
    name: z.string().min(1, 'Item name is required'),
    quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
    net_price: z.coerce.number({ required_error: 'Net price is required' }),

    // unit: z.string().optional().nullable(),
    // vat: z.coerce.number().optional(), // Add VAT property as optional (required for VAT invoices)
    // gross_price: z.number({ required_error: 'Gross price is required' }),
    // pkwiu: z.string().optional().nullable(),
    // gtu: z.string().optional().nullable(),
    // discount: z.number().optional().nullable(),
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

export const baseInvoiceSchema = z.object({
    type: z.nativeEnum(InvoiceType, { required_error: 'Invoice type is required' }),
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.string().min(1, 'Issue date is required'),
    seller_id: z.number().min(1),
    buyer_id: z.number().min(1),
    ...paymentSchema.shape,
    ...saleAndDueSchema.shape,
    // payment_method: z.nativeEnum(PaymentMethod, { required_error: 'Payment method is required' }),
    // currency: z.nativeEnum(Currency, { required_error: 'Currency method is required' }),
    // is_already_paid: z.boolean(),
    // invoice_items: z.array(invoiceItem).min(1, 'At least one item is required'),
});

export type BaseInvoiceSchema = z.infer<typeof baseInvoiceSchema>;
