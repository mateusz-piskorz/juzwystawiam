import { z } from 'zod';
import { invoiceSchemaNoVat } from './invoice-types/no-vat';
import { invoiceSchemaVat } from './invoice-types/vat';

export const invoiceSchema = z.discriminatedUnion('type', [invoiceSchemaNoVat, invoiceSchemaVat]);

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
