<?php

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
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->decimal('quantity', 15, 2);
            $table->string('unit')->nullable();
            $table->decimal('net_price', 15, 2)->nullable();
            $table->decimal('gross_price', 15, 2)->nullable();
            $table->decimal('vat_rate', 5, 2)->nullable();
            $table->string('pkwiu')->nullable();
            $table->string('gtu')->nullable();
            $table->decimal('discount', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
