import { z } from 'zod';
import { InvoiceType } from '../../enums/invoice-type';
import { baseInvoiceSchema, invoiceItem } from './base-invoice-schema';

const invoiceItemWithVat = invoiceItem.merge(z.object({ vat: z.coerce.number().min(1, 'Select VAT') }));

export const vatSchema = baseInvoiceSchema.merge(
    z.object({
        type: z.literal(InvoiceType.VAT),

        invoice_items: z.array(invoiceItemWithVat).min(1, 'At least one item is required'),
    }),
);

export type VatSchema = z.infer<typeof vatSchema>;
