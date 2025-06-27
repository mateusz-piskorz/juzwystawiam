<?php

namespace App\Enums;

enum PaymentMethod: string {
    case BANK_TRANSFER = 'BANK_TRANSFER';
    case CASH = 'CASH';
    case CARD = 'CARD';
    case BARTER = 'BARTER';
    case CHEQUE = 'CHEQUE';
    case COD = 'COD';
    case OTHER = 'OTHER';
    case COMPENSATION = 'COMPENSATION';
    case LETTER_OF_CREDIT = 'LETTER_OF_CREDIT';
    case PAYPAL = 'PAYPAL';
    case PAYU = 'PAYU';
    case PROMISSORY_NOTE = 'PROMISSORY_NOTE';
    case PREPAYMENT = 'PREPAYMENT';
    case INSTALLMENT_SALE = 'INSTALLMENT_SALE';
    case TPAY = 'TPAY';
    case PRZELEWY24 = 'PRZELEWY24';
    case DOTPAY = 'DOTPAY';
}
