import { z } from 'zod';
import { INVOICE_TYPE } from '../../../enums/invoice-type';
import { invoiceSchemaBase } from '../base';

export const invoiceSchemaNoVat = z.object({
    ...invoiceSchemaBase.shape,
    type: z.literal(INVOICE_TYPE.NO_VAT),
});
