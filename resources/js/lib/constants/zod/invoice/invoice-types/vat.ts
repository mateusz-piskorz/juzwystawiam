import { z } from 'zod';
import { INVOICE_TYPE } from '../../../enums/invoice-type';
import { VAT_RATE } from '../../../enums/vat-rate';
import { invoiceProductBase, invoiceSchemaBase } from '../base';

const invoiceProductVat = z.object({
    ...invoiceProductBase.shape,
    vat_rate: z.nativeEnum(VAT_RATE),
});

export const invoiceSchemaVat = z.object({
    ...invoiceSchemaBase.shape,
    type: z.literal(INVOICE_TYPE.VAT),
    invoice_products: z.array(invoiceProductVat).min(1),
});
