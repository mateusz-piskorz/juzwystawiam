<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Contractor;

class ContractorBelongsToUser implements Rule
{
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function passes($attribute, $value)
    {
        return Contractor::where('id', $value)
            ->where('user_id', $this->userId)
            ->exists();
    }

    public function message()
    {
        return 'The selected contractor does not belong to the user.';
    }
}
