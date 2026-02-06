<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class BelongsToUser implements ValidationRule
{
    /**
     * @param  string  $table  Table name in DB (e.g. products, expense_types)
     */
    public function __construct(
        protected string $table,
        protected mixed $userId
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = DB::table($this->table)
            ->where('id', $value)
            ->where('user_id', $this->userId)
            ->exists();

        if (! $exists) {
            $fail("The selected $attribute is invalid or does not belong to your account.");
        }
    }
}
