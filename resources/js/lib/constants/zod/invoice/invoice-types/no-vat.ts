import { z } from 'zod';
import { invoiceSchemaBase } from '../base';

export const invoiceSchemaNoVat = z.object({
    ...invoiceSchemaBase.shape,
    type: z.literal('NO_VAT'),
});
