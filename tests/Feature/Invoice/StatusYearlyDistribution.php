<?php

use App\Models\Invoice;
use App\Models\User;
use Carbon\Carbon;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his invoices', function () {
    getJson(route('api.invoices.index'))->assertUnauthorized();
});

it('returns the distribution of paid and unpaid invoices for this and last year', function () {
    // 1. Freeze time to a specific date in 2026
    Carbon::setTestNow('2026-05-20');

    $user = User::factory()->create();

    // 2. Create Invoices for This Year (2026)
    Invoice::factory()->count(2)->create([
        'user_id' => $user->id,
        'is_already_paid' => true,
        'created_at' => now(), // 2026
    ]);
    Invoice::factory()->create([
        'user_id' => $user->id,
        'is_already_paid' => false,
        'created_at' => now(), // 2026
    ]);

    // 3. Create Invoices for Last Year (2025)
    Invoice::factory()->count(1)->create([
        'user_id' => $user->id,
        'is_already_paid' => true,
        'created_at' => now()->subYear(), // 2025
    ]);
    Invoice::factory()->count(3)->create([
        'user_id' => $user->id,
        'is_already_paid' => false,
        'created_at' => now()->subYear(), // 2025
    ]);

    // 4. Act & Assert
    actingAs($user)
        ->getJson(route('invoices.status-distribution')) // Adjust route name
        ->assertOk()
        ->assertJson([
            'this_year' => [
                'paid' => 2,
                'unpaid' => 1,
            ],
            'prev_year' => [
                'paid' => 1,
                'unpaid' => 3,
            ],
        ]);

    Carbon::setTestNow(); // Reset time
});
