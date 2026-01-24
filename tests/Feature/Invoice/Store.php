<?php

use App\Enums\ContractorRole;
use App\Models\Contractor;
use App\Models\Invoice;
use App\Models\InvoiceContractor;
use App\Models\InvoiceProduct;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('unauthenticated user cannot create invoice', function () {
    postJson(route('api.invoices.store'), Invoice::factory()->raw())->assertUnauthorized();
    assertDatabaseEmpty('invoices');
});

test('authenticated user can create invoice', function () {
    $user = User::factory()->has(Contractor::factory())->create();
    $invoiceData = collect(Invoice::factory()->raw(['user_id' => $user->id]))
        ->except(['total', 'total_vat_amount', 'total_discount_amount', 'grand_total'])
        ->toArray();

    $invoiceContractorData = InvoiceContractor::factory()->count(2)->sequence(
        ['role' => ContractorRole::SELLER],
        ['role' => ContractorRole::BUYER]
    )->raw(['contractor_id' => $user->contractors()->first()]);

    $invoiceProductData = InvoiceProduct::factory()->count(3)->raw(['product_id' => null]);

    actingAs($user)
        ->postJson(route('api.invoices.store'), [...$invoiceData, 'invoice_contractors' => $invoiceContractorData, 'invoice_products' => $invoiceProductData])
        ->assertCreated();

    expect($user->invoices)->toHaveCount(1);
    assertDatabaseHas('invoices', $invoiceData);
});
