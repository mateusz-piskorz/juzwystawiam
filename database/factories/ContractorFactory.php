<?php

namespace Database\Factories;

use App\Enums\TypeOfBusiness;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contractor>
 */
class ContractorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type_of_business' => TypeOfBusiness::OTHER_BUSINESS,
            'is_own_company'   => fake()->boolean(),
            'postal_code'      => fake()->postcode(),
            'city'             => fake()->city(),
            'country'          => fake()->country(),
            'bank_account'     => fake()->bankAccountNumber(),
            'nip'              => fake()->numerify('##########'),
            'company_name'     => fake()->company(),
            'email'            => fake()->unique()->safeEmail(),
            'street_name'      => fake()->streetAddress(),
            'phone'            => fake()->phoneNumber(),
            'first_name'       => fake()->firstName(),
            'surname'          => fake()->lastName()
        ];
    }
}
