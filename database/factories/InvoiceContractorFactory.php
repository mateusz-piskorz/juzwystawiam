<?php

namespace Database\Factories;

use App\Enums\ContractorRole;
use App\Models\Contractor;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceContractorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invoice_id' => Invoice::factory(),
            'contractor_id' => Contractor::factory(),
            'role' => fake()->randomElement(ContractorRole::class),
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
