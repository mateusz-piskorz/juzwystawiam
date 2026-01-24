<?php

use App\Models\Invoice;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\deleteJson;

test('unauthenticated user cannot delete invoice', function () {
    $invoice = Invoice::factory()->create();
    deleteJson(route('api.invoices.destroy', $invoice))->assertUnauthorized();
    assertDatabaseHas($invoice);
});

test("user cannot delete another user's invoice", function () {
    $invoice = Invoice::factory()->create();

    actingAs(User::factory()->create())
        ->deleteJson(route('api.invoices.destroy', $invoice))
        ->assertForbidden();

    assertDatabaseHas($invoice);
});

test('user can delete his own invoice', function () {
    $invoice = Invoice::factory()->create();

    actingAs($invoice->user)
        ->deleteJson(route('api.invoices.destroy', $invoice))
        ->assertOk();

    assertDatabaseMissing($invoice);
});
