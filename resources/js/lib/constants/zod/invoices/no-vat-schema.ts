import { z } from 'zod';
import { INVOICE_TYPE } from '../../enums/invoice-type';
import { baseInvoiceSchema } from './base-invoice-schema';

export const noVatSchema = baseInvoiceSchema.merge(
    z.object({
        type: z.literal(INVOICE_TYPE.NO_VAT),
    }),
);

export type NoVatSchema = z.infer<typeof noVatSchema>;
