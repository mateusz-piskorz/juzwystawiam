<?php

use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his expense types', function () {
    getJson(route('api.expense-types.index'))->assertUnauthorized();
});

test('user can get his expense types', function () {
    $expenseType = ExpenseType::factory(['name' => 'advertising'])->create();
    ExpenseType::factory()->create();

    actingAs($expenseType->user)
        ->getJson(route('api.expense-types.index'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.name', 'advertising');
});

test('filters expense types by name - q param', function () {
    $user = User::factory()
        ->has(ExpenseType::factory()->count(2)->sequence(
            ['name' => 'advertising'],
            ['name' => 'entertainment']
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.expense-types.index', ['q' => 'adver']))
        ->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.name', 'advertising');
});
