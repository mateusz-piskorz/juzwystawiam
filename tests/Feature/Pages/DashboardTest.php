<?php

use App\Models\Invoice;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertOk();
});

test('invoices page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('invoices'));

    $response->assertOk();
});

test('invoices.create page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('invoices.create'));

    $response->assertOk();
});

test('invoices.show page is displayed', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(3))
        ->create();

    $invoiceId = $user->invoices()->first()->id;

    $response = $this
        ->actingAs($user)
        ->get(route('invoices.show', $invoiceId));

    $response->assertOk();
});

test('invoices.edit page is displayed', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(3))
        ->create();

    $invoiceId = $user->invoices()->first()->id;

    $response = $this
        ->actingAs($user)
        ->get(route('invoices.edit', $invoiceId));

    $response->assertOk();
});

test('invoices.pdf-preview page is displayed', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(3))
        ->create();

    $invoiceId = $user->invoices()->first()->id;

    $response = $this
        ->actingAs($user)
        ->get(route('invoices.pdf-preview', $invoiceId));

    $response->assertOk();
});

test('invoices.pdf-download page is displayed', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(3))
        ->create();

    $invoiceId = $user->invoices()->first()->id;

    $response = $this
        ->actingAs($user)
        ->get(route('invoices.pdf-download', $invoiceId));

    $response->assertOk();
});

test('settings page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('settings'));

    $response->assertOk();
});

test('contractors page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('contractors'));

    $response->assertOk();
});

test('products page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('products'));

    $response->assertOk();
});

test('analytics page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('analytics'));

    $response->assertOk();
});

// test('premium-account.buy page is displayed', function () {
//     $user = User::factory()->create();

//     $response = $this
//         ->actingAs($user)
//         ->get(route('premium-account.buy') . '?days=7');

//     $response->assertOk();
// });
