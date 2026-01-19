<?php

namespace Database\Factories;

use App\Enums\Currency;
use App\Enums\InvoiceType;
use App\Enums\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => InvoiceType::NO_VAT,
            'number' => 'FR '.date('d/m/Y'),
            'issue_date' => now(),
            'payment_method' => PaymentMethod::CASH,
            'currency' => Currency::PLN,
            'is_already_paid' => true,
            'sale_date' => now(),
            'due_date' => now()->addDays(10),
            'total' => fake()->randomFloat(2, 0, 10000),
            'total_vat_amount' => fake()->randomFloat(2, 0, 10000),
            'total_discount_amount' => fake()->randomFloat(2, 0, 10000),
            'grand_total' => fake()->randomFloat(2, 0, 10000),
        ];
    }
}
