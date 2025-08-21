import { z } from 'zod';
import { schemas } from '../../openapi.json.client';
import { invoiceProductBase, invoiceSchemaBase } from '../base';

const invoiceProductVat = z.object({
    ...invoiceProductBase.shape,
    vat_rate: schemas.VatRate,
});

export const invoiceSchemaVat = z.object({
    ...invoiceSchemaBase.shape,
    type: z.literal('VAT'),
    invoice_products: z.array(invoiceProductVat).min(1),
});
