<?php

use App\Enums\TypeOfBusiness;
use App\Models\Contractor;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update contractor', function () {
    $contractor = Contractor::factory()->create(['company_name' => 'Original Name']);
    putJson(route('api.contractors.update', $contractor), ['company_name' => 'New Name'])->assertUnauthorized();
    expect($contractor->fresh()->company_name)->toBe('Original Name');
});

test("user cannot update another user's contractor", function () {
    $contractor = Contractor::factory()->create(['company_name' => 'Original Name']);

    actingAs(User::factory()->create())
        ->putJson(route('api.contractors.update', $contractor), ['company_name' => 'New Name'])
        ->assertForbidden();

    expect($contractor->fresh()->company_name)->toBe('Original Name');
});

test('user can update his own contractor', function () {
    $contractor = Contractor::factory()->create(['type_of_business' => TypeOfBusiness::SELF_EMPLOYED]);

    actingAs($contractor->user)
        ->putJson(route('api.contractors.update', $contractor), ['company_name' => 'Updated Name'])
        ->assertOk();

    expect($contractor->fresh()->company_name)->toBe('Updated Name');
});
