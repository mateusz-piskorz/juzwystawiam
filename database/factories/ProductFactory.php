<?php

namespace Database\Factories;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 1, 1000),
            'measure_unit' => MeasureUnit::PCS,
            'vat_rate' => VatRate::CASE5,
        ];
    }
}
