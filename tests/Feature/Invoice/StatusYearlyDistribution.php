<?php

use App\Models\Invoice;
use App\Models\User;
use Carbon\Carbon;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his yearly distribution invoices', function () {
    getJson(route('api.invoices.status-yearly-distribution'))->assertUnauthorized();
});

test('user can get his yearly distribution invoices', function () {
    Carbon::setTestNow('2026-05-20');
    $user = User::factory()->create();

    // Create 2026 invoices: 2 paid, 1 unpaid
    Invoice::factory(3)->sequence(
        ['is_already_paid' => true],
        ['is_already_paid' => true],
        ['is_already_paid' => false],
    )->create(['user_id' => $user->id, 'created_at' => now()]);

    // Create 2025 invoices: 1 paid, 1 unpaid
    Invoice::factory(2)->sequence(
        ['is_already_paid' => true],
        ['is_already_paid' => false],
    )->create(['user_id' => $user->id, 'created_at' => now()->subYear()]);

    actingAs($user)
        ->getJson(route('api.invoices.status-yearly-distribution'))
        ->assertOk()
        ->assertExactJson([
            'this_year' => ['paid' => 2, 'unpaid' => 1],
            'prev_year' => ['paid' => 1, 'unpaid' => 1],
        ]);

    Carbon::setTestNow();
});
