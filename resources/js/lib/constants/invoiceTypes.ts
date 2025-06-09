export enum InvoiceType {
    VAT = 'VAT',
    NO_VAT = 'NO_VAT',
    RECEIPT = 'RECEIPT',
    CORRECTION = 'CORRECTION',
}

export enum ContractorRole {
    BUYER = 'BUYER',
    SELLER = 'SELLER',
}
export enum PaymentMethod {
    BANK_TRANSFER = 'PrzelewDodaj rachunek bankowy',
    CASH = 'Gotówka',
    CARD = 'Karta płatnicza',
    BARTER = 'Barter',
    CHEQUE = 'Czek',
    COD = 'Za pobraniem',
    OTHER = 'Inny',
    COMPENSATION = 'Kompensata',
    LETTER_OF_CREDIT = 'AkredytywaDodaj rachunek bankowy',
    PAYPAL = 'PayPal',
    PAYU = 'PayU',
    PROMISSORY_NOTE = 'Weksel',
    PREPAYMENT = 'Przedpłata',
    INSTALLMENT_SALE = 'Sprzedaż ratalna',
    TPAY = 'Tpay',
    PRZELEWY24 = 'Przelewy24',
    DOTPAY = 'Dotpay',
}

export enum Currency {
    PLN = 'PLN',
    EUR = 'EUR',
    USD = 'USD',
    GBP = 'GBP',
    SEK = 'SEK',
    CAD = 'CAD',
    JPY = 'JPY',
    DKK = 'DKK',
    CZK = 'CZK',
    NOK = 'NOK',
    HUF = 'HUF',
    AUD = 'AUD',
    UAH = 'UAH',
    CHF = 'CHF',
    RUB = 'RUB',
    ZAR = 'ZAR',
    INR = 'INR',
    NZD = 'NZD',
    RON = 'RON',
    CNY = 'CNY',
    HRK = 'HRK',
    BGN = 'BGN',
    BRL = 'BRL',
    MXN = 'MXN',
    TRY = 'TRY',
    SGD = 'SGD',
    HKD = 'HKD',
    ISK = 'ISK',
    ILS = 'ILS',
    CLP = 'CLP',
    PHP = 'PHP',
    MYR = 'MYR',
    IDR = 'IDR',
    KRW = 'KRW',
    XDR = 'XDR',
    THB = 'THB',
}

export function asInvoiceType(value: unknown): InvoiceType | undefined {
    return Object.values(InvoiceType).includes(value as InvoiceType) ? (value as InvoiceType) : undefined;
}
