import { InvoiceType } from '../constants/enums/invoice-type';

export function asInvoiceType(value: unknown): InvoiceType | undefined {
    return Object.values(InvoiceType).includes(value as InvoiceType) ? (value as InvoiceType) : undefined;
}
