import { z } from 'zod';
import { InvoiceType } from '../../enums/invoice-type';
import { baseInvoiceSchema } from './base-invoice-schema';

export const noVatSchema = baseInvoiceSchema.merge(
    z.object({
        type: z.literal(InvoiceType.NO_VAT),
    }),
);

export type NoVatSchema = z.infer<typeof noVatSchema>;
