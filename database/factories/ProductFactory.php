<?php

namespace Database\Factories;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => fake()->word(),
            'description'  => fake()->sentence(),
            'price'        => fake()->randomFloat(2, 1, 1000),
            'measure_unit' => MeasureUnit::PCS,
            'vat_rate'     => VatRate::CASE5
        ];
    }
}
