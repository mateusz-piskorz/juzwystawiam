<?php

namespace Database\Factories;

use App\Enums\Currency;
use App\Enums\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'number' => 'FR '.date('d/m/Y'),
            'issue_date' => now()->roundSecond(),
            'payment_method' => fake()->randomElement(PaymentMethod::class),
            'currency' => fake()->randomElement(Currency::class),
            'is_already_paid' => true,
            'sale_date' => now()->roundSecond(),
            'due_date' => now()->addDays(10)->roundSecond(),
            'total' => fake()->randomFloat(2, 0, 10000),
            'total_vat_amount' => fake()->randomFloat(2, 0, 10000),
            'total_discount_amount' => fake()->randomFloat(2, 0, 10000),
            'grand_total' => fake()->randomFloat(2, 0, 10000),
        ];
    }
}
