import { z } from 'zod';
import { InvoiceType } from '../../enums/invoice-type';
import { VAT_RATE } from '../../enums/vat-rate';
import { baseInvoiceSchema, invoiceProduct } from './base-invoice-schema';

const invoiceItemWithVat = invoiceProduct.merge(z.object({ vat_rate: z.nativeEnum(VAT_RATE) }));

export const vatSchema = baseInvoiceSchema.merge(
    z.object({
        type: z.literal(InvoiceType.VAT),
        invoice_products: z.array(invoiceItemWithVat).min(1, 'At least one item is required'),
    }),
);

export type VatSchema = z.infer<typeof vatSchema>;
