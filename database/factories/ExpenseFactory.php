<?php

namespace Database\Factories;

use App\Models\ExpenseType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'expense_type_id' => ExpenseType::factory(),
            'title' => fake()->word(),
            'description' => fake()->sentence(),
            'total' => fake()->randomFloat(2, 1, 1000),
        ];
    }
}
