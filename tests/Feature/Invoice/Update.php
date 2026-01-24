<?php

use App\Models\Invoice;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update invoice', function () {
    $invoice = Invoice::factory()->create(['number' => 'FR-1']);
    putJson(route('api.invoices.update', $invoice), ['number' => 'FR-2'])->assertUnauthorized();
    expect($invoice->fresh()->number)->toBe('FR-1');
});

test("user cannot update another user's invoice", function () {
    $invoice = Invoice::factory()->create(['number' => 'FR-1']);

    actingAs(User::factory()->create())
        ->putJson(route('api.invoices.update', $invoice), ['number' => 'FR-1'])
        ->assertForbidden();

    expect($invoice->fresh()->number)->toBe('FR-1');
});

test('user can update his own invoice', function () {
    $invoice = Invoice::factory()->create();

    actingAs($invoice->user)
        ->putJson(route('api.invoices.update', $invoice), ['number' => 'FR-2'])
        ->assertOk();

    expect($invoice->fresh()->number)->toBe('FR-2');
});
