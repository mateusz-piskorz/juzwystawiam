<?php

namespace App\Rules;

use App\Models\ExpenseType;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ExpenseTypeBelongsToUser implements ValidationRule
{
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = ExpenseType::where('id', $value)
            ->where('user_id', $this->userId)
            ->exists();

        if (! $exists) {
            $fail('Wybrany typ wydatku jest nieprawidłowy lub nie należy do Twojego konta.');
        }
    }
}
