import { INVOICE_TYPE } from '../constants/enums/invoice-type';

export function asInvoiceType(value: unknown): INVOICE_TYPE | undefined {
    return Object.values(INVOICE_TYPE).includes(value as INVOICE_TYPE) ? (value as INVOICE_TYPE) : undefined;
}
