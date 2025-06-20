import { NoVatSchema, noVatSchema } from './no-vat-schema';
import { VatSchema, vatSchema } from './vat-schema';

export { noVatSchema, vatSchema };
export type { NoVatSchema, VatSchema };

export type CreateInvoiceDTO = VatSchema | NoVatSchema;
