<?php

namespace App\Enums;

enum InvoiceType: string
{
    case VAT = 'VAT';
    case NO_VAT = 'NO_VAT';
}
