<?php

namespace App\Rules;

use App\Models\Product;
use Illuminate\Contracts\Validation\Rule;

//todo: validation rules refactor
//https://laravel.com/docs/12.x/validation#custom-validation-rules

class ProductBelongsToUser implements Rule
{
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function passes($attribute, $value)
    {
        return Product::where('id', $value)
            ->where('user_id', $this->userId)
            ->exists();
    }

    public function message()
    {
        return 'The selected product does not belong to the user.';
    }
}
