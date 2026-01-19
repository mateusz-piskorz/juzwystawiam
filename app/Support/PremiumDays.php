<?php

namespace App\Support;

use Carbon\Carbon;

// todo: support classes refactor
class PremiumDays
{
    public static function daysLeft($expiresAt)
    {
        $expiresAt = $expiresAt ? Carbon::parse($expiresAt) : null;
        if (! $expiresAt || $expiresAt->isPast()) {
            return 0;
        }

        return (int) ceil(Carbon::now()->diffInMinutes($expiresAt, false) / 1440);
    }
}
