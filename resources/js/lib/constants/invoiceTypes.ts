export enum InvoiceType {
    VAT = 'VAT',
    NO_VAT = 'NO_VAT',
    Receipt = 'Receipt',
    Correction = 'Correction',
}

export enum ContractorRole {
    Buyer = 'buyer',
    Seller = 'seller',
}

export function asInvoiceType(value: unknown): InvoiceType | undefined {
    return Object.values(InvoiceType).includes(value as InvoiceType) ? (value as InvoiceType) : undefined;
}
