<?php

use App\Enums\TypeOfBusiness;
use App\Models\Contractor;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his contractors', function () {
    getJson(route('api.contractors.index'))->assertUnauthorized();
});

test('user can get his contractors', function () {
    $contractor = Contractor::factory(['city' => 'city1'])->create();
    Contractor::factory()->create();

    actingAs($contractor->user)
        ->getJson(route('api.contractors.index'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.city', 'city1');
});

test('filters contractors by company_name', function () {
    $user = User::factory()
        ->has(Contractor::factory()->count(2)->sequence(
            ['company_name' => 'Facebook Meta', 'type_of_business' => TypeOfBusiness::SELF_EMPLOYED],
            ['company_name' => 'Google', 'type_of_business' => TypeOfBusiness::SELF_EMPLOYED]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.contractors.index', ['q' => 'Meta']))
        ->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.company_name', 'Facebook Meta');
});

test('filters contractors by type_of_business and is_own_company', function () {
    $user = User::factory()
        ->has(Contractor::factory()->count(2)->sequence(
            ['type_of_business' => TypeOfBusiness::PRIVATE_PERSON, 'is_own_company' => true],
            ['type_of_business' => TypeOfBusiness::SELF_EMPLOYED, 'is_own_company' => false]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.contractors.index', ['type_of_business' => TypeOfBusiness::PRIVATE_PERSON]))
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.type_of_business', TypeOfBusiness::PRIVATE_PERSON);

    actingAs($user)
        ->getJson(route('api.contractors.index', ['is_own_company' => false]))
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.is_own_company', false);
});

test('sorts results - contractors', function () {
    $user = User::factory()
        ->has(Contractor::factory()->count(3)->sequence(
            ['type_of_business' => TypeOfBusiness::SELF_EMPLOYED],
            ['type_of_business' => TypeOfBusiness::OTHER_BUSINESS],
            ['type_of_business' => TypeOfBusiness::PRIVATE_PERSON]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.contractors.index', [
            'sort' => 'type_of_business',
            'sort_direction' => 'asc',
        ]))
        ->assertOk()
        ->assertJsonCount(3, 'data')
        ->assertJsonPath('data.0.type_of_business', TypeOfBusiness::OTHER_BUSINESS);
});
