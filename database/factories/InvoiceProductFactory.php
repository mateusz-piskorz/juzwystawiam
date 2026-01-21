<?php

namespace Database\Factories;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceProductFactory extends Factory
{
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 10);
        $price = fake()->randomFloat(2, 10, 1000);
        $vatRate = fake()->randomElement(VatRate::class);
        $discount = fake()->numberBetween(1, 50);

        $subtotal = $quantity * $price;
        $totalDiscount = ($subtotal * ($discount / 100));
        $totalAfterDiscount = $subtotal - $totalDiscount;
        $totalVat = ($totalAfterDiscount * ($vatRate->value / 100));

        return [
            'invoice_id' => Invoice::factory(),
            'product_id' => Product::factory(),
            'name' => fake()->words(3, true),
            'quantity' => $quantity,
            'price' => $price,
            'measure_unit' => fake()->randomElement(MeasureUnit::class),
            'vat_rate' => $vatRate,
            'discount' => $discount,
            'total' => $subtotal,
            'total_vat_amount' => $totalVat,
            'total_discount_amount' => $totalDiscount,
            'grand_total' => $totalAfterDiscount + $totalVat,
        ];
    }
}
