<?php

namespace App\Enums;

enum TypeOfBusiness: string {
    case PRIVATE_PERSON = 'PRIVATE_PERSON';
    case SELF_EMPLOYED = 'SELF_EMPLOYED';
    case OTHER_BUSINESS = 'OTHER_BUSINESS';
}
