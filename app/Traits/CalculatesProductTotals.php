<?php

namespace App\Traits;

trait CalculatesProductTotals
{
    public function CalculateProductTotals(array $products)
    {

        $totalBeforeVat = 0;
        $totalVatAmount = 0;
        $totalWithVat = 0;
        $totalDiscountAmount = 0;

        foreach ($products as $product) {

            $totals = $this->CalculateSingleProductTotals($product);

            $totalBeforeVat += $totals['total'];
            $totalVatAmount += $totals['total_vat_amount'];
            $totalWithVat += $totals['grand_total'];
            $totalDiscountAmount += $totals['total_discount_amount'];
        }

        return [
            'total'                 => (float) $totalBeforeVat,
            'total_vat_amount'      => (float) $totalVatAmount,
            'total_discount_amount' => (float) $totalDiscountAmount,
            'grand_total'           => (float) $totalWithVat
        ];

    }

    public function CalculateSingleProductTotals(mixed $product)
    // we also need to return calculate discountAmount and save in db
    {

        $quantity = $product['quantity'];
        $price = $product['price'];
        $discount = $product['discount'] ?? 0;
        $vatRate = $product['vat_rate'] ?? 0;

        $subtotal = $quantity * $price;
        $discountAmount = $subtotal * ($discount / 100);
        $discountedSubtotal = $subtotal - $discountAmount;

        $vatAmount = $discountedSubtotal * ($vatRate / 100);

        $totalBeforeVat = $discountedSubtotal;
        $totalVatAmount = $vatAmount;
        $totalWithVat = $discountedSubtotal + $vatAmount;

        return [
            'total'                 => (float) $totalBeforeVat,
            'total_vat_amount'      => (float) $totalVatAmount,
            'total_discount_amount' => (float) $discountAmount,
            'grand_total'           => (float) $totalWithVat
        ];

    }
}
