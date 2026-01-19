<?php

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->integer('quantity');
            $table->decimal('price', 12, 2);
            $table->enum('measure_unit', array_column(MeasureUnit::cases(), 'value'));
            $table->enum('vat_rate', array_column(VatRate::cases(), 'value'))->default(VatRate::CASE0->value);
            $table->integer('discount')->nullable();
            $table->decimal('total', 12, 2);
            $table->decimal('total_vat_amount', 12, 2);
            $table->decimal('total_discount_amount', 12, 2);
            $table->decimal('grand_total', 12, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_products');
    }
};
