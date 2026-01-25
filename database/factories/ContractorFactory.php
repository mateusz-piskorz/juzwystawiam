<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContractorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'is_own_company' => fake()->boolean(),
            'company_name' => fake()->company(),
            'nip' => fake()->numerify('##########'),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'country' => fake()->country(),
            'bank_account' => fake()->bankAccountNumber(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'street_name' => fake()->streetAddress(),
        ];
    }
}
