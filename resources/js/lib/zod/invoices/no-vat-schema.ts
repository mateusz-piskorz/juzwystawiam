import { InvoiceType } from '@/constants/invoiceTypes';
import { z } from 'zod';
import { baseInvoiceSchema } from './base-invoice-schema';

export const noVatSchema = baseInvoiceSchema.merge(
    z.object({
        type: z.literal(InvoiceType.NO_VAT),
        no_vat_reason: z.string().optional(),
    }),
);
