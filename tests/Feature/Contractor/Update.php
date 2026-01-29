<?php

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
    $contractor = Contractor::factory()->create();

    actingAs($contractor->user)
        ->putJson(route('api.contractors.update', $contractor), ['company_name' => 'Updated Name'])
        ->assertOk();

    expect($contractor->fresh()->company_name)->toBe('Updated Name');
});

test('default seller removed if is_own_company changes to false', function () {
    $contractor = Contractor::factory()->create(['is_own_company' => true]);
    $user = $contractor->user;
    $user->default_seller_id = $contractor->id;
    $user->save();

    actingAs($user)
        ->putJson(route('api.contractors.update', $contractor), ['is_own_company' => false])
        ->assertOk();

    expect($contractor->fresh()->is_own_company)->toBe(false);
    expect($user->fresh()->default_seller_id)->toBe(null);
});
