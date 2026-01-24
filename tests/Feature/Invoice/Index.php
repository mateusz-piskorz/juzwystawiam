<?php

use App\Enums\InvoiceType;
use App\Models\Contractor;
use App\Models\Invoice;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his invoices', function () {
    getJson(route('api.invoices.index'))->assertUnauthorized();
});

test('user can get his invoices', function () {
    $invoice = Invoice::factory(['number' => 'FR-1'])->create();
    Contractor::factory()->create();

    actingAs($invoice->user)
        ->getJson(route('api.invoices.index'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.number', 'FR-1');
});

test('filters invoices by number - q param', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(2)->sequence(
            ['number' => 'faktura FR-1'],
            ['number' => 'FR-2']
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.invoices.index', ['q' => 'faktura']))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.number', 'faktura FR-1');
});

test('filters invoices by type and is_already_paid', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(2)->sequence(
            ['type' => InvoiceType::VAT, 'is_already_paid' => true],
            ['type' => InvoiceType::NO_VAT, 'is_already_paid' => false]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.invoices.index', ['type' => InvoiceType::VAT]))
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.type', InvoiceType::VAT);

    actingAs($user)
        ->getJson(route('api.invoices.index', ['is_already_paid' => false]))
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.is_already_paid', false);
});

test('sorts results - invoices', function () {
    $fixedDate = now()->parse('2026-01-22 12:00:00');

    $user = User::factory()
        ->has(Invoice::factory()->count(3)->sequence(
            ['sale_date' => $fixedDate->copy()->subDay()],
            ['sale_date' => $fixedDate->copy()->subDays(2)],
            ['sale_date' => $fixedDate]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.invoices.index', [
            'sort' => 'sale_date',
            'sort_direction' => 'desc',
        ]))
        ->assertOk()
        ->assertJsonCount(3, 'data')
        ->assertJsonPath('data.0.sale_date', $fixedDate->format('Y-m-d H:i:s').'+00');
});
