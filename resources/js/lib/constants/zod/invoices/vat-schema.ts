import { z } from 'zod';
import { INVOICE_TYPE } from '../../enums/invoice-type';
import { VAT_RATE } from '../../enums/vat-rate';
import { baseInvoiceSchema, invoiceProduct } from './base-invoice-schema';

const invoiceProductWithVat = invoiceProduct.merge(z.object({ vat_rate: z.nativeEnum(VAT_RATE) }));

export const vatSchema = baseInvoiceSchema.merge(
    z.object({
        type: z.literal(INVOICE_TYPE.VAT),
        invoice_products: z.array(invoiceProductWithVat).min(1, 'At least one item is required'),
    }),
);

export type VatSchema = z.infer<typeof vatSchema>;
