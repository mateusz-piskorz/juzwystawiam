<?php

use App\Models\Contractor;
use App\Models\User;

test('api.contractors.index endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson(route("api.contractors.index"));
    $response->assertStatus(200);
});

test('api.contractors.store endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(route("api.contractors.store"),
        [
            'type_of_business' => 'SELF_EMPLOYED',
            'is_own_company'   => true,
            'nip'              => '1234567890',
            'postal_code'      => '00-001',
            'city'             => 'Warsaw',
            'country'          => 'Poland',
            'company_name'     => 'Test Company',
            'street_name'      => 'Main Street 1',
            'email'            => 'test@example.com',
            'phone'            => '123456789',
            'bank_account'     => '12345678901234567',
            'first_name'       => 'Jan',
            'surname'          => 'Kowalski'
        ]
    );
    $response->assertStatus(201);
});

test('api.contractors.update endpoint is working', function () {
    $user = User::factory()->has(Contractor::factory())->create();

    $contractorId = $user->contractors()->first()->id;

    $response = $this->actingAs($user)->putJson(route("api.contractors.update", $contractorId),
        [
            'type_of_business' => 'SELF_EMPLOYED',
            'is_own_company'   => true,
            'nip'              => '1234567890',
            'postal_code'      => '00-001',
            'city'             => 'Warsaw',
            'country'          => 'Poland',
            'company_name'     => 'Test Company',
            'street_name'      => 'Main Street 1',
            'email'            => 'test@example.com',
            'phone'            => '123456789',
            'bank_account'     => '12345678901234567',
            'first_name'       => 'Jan',
            'surname'          => 'Kowalski'
        ]
    );
    $response->assertStatus(201);
});

test('api.contractors.destroy endpoint is working', function () {
    $user = User::factory()->has(Contractor::factory())->create();

    $contractorId = $user->contractors()->first()->id;

    $response = $this->actingAs($user)->deleteJson(route("api.contractors.destroy", $contractorId));
    $response->assertStatus(200);
});
