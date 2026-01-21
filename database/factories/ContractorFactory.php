<?php

namespace Database\Factories;

use App\Enums\TypeOfBusiness;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContractorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'type_of_business' => fake()->randomElement(TypeOfBusiness::class),
            'is_own_company' => fake()->boolean(),
            'postal_code' => fake()->postcode(),
            'city' => fake()->city(),
            'country' => fake()->country(),
            'bank_account' => fake()->bankAccountNumber(),
            'nip' => fake()->numerify('##########'),
            'company_name' => fake()->company(),
            'email' => fake()->unique()->safeEmail(),
            'street_name' => fake()->streetAddress(),
            'phone' => fake()->phoneNumber(),
            'first_name' => fake()->firstName(),
            'surname' => fake()->lastName(),
        ];
    }
}
