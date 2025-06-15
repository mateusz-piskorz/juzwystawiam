<?php

namespace App\Enums;

enum TypeOfBusiness: string {
    case PRIVATE_PERSON = 'private_person'; // osoba prywatna
    case SELF_EMPLOYED = 'self_employed'; // jednosobowa działalność gospodarcza
    case OTHER_BUSINESS = 'other_business'; // inna forma działalności
}
