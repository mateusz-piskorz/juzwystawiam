<?php

use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Product;
use Carbon\Carbon;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his monthly distribution invoices', function () {
    getJson(route('api.invoices.status-monthly-distribution'))->assertUnauthorized();
});

test('returns monthly distribution filtered by year and product', function () {
    Carbon::setTestNow('2026-05-20');

    $product = Product::factory()->create();

    // Create 2 invoices in May 2026 (1 paid, 1 unpaid) for the product
    Invoice::factory(2)->has(InvoiceProduct::factory(['product_id' => $product->id]))
        ->sequence(
            ['is_already_paid' => true],
            ['is_already_paid' => false]
        )
        ->create([
            'user_id' => $product->user->id,
            'created_at' => now(), // May
        ]);

    // Create 1 invoice in Jan 2026 for a DIFFERENT product
    Invoice::factory()->create([
        'user_id' => $product->user->id,
        'created_at' => now()->startOfYear(),
    ]);

    actingAs($product->user)
        ->getJson(route('api.invoices.status-monthly-distribution', [
            'period' => 'this_year',
            'product' => [$product->id],
        ]))
        ->assertOk()
        ->assertJsonPath('months.4.month', 'May')
        ->assertJsonPath('months.4.paid', 1)
        ->assertJsonPath('months.4.unpaid', 1)
        ->assertJsonPath('overall.total', 2);

    Carbon::setTestNow();
});
