<?php

namespace App\Enums;

enum EmailStatus: string {
    case PENDING = 'PENDING';
    case SENT = 'SENT';
    case FAILED = 'FAILED';
}
