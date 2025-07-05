<?php

use App\Enums\Currency;
use App\Enums\InvoiceType;
use App\Enums\PaymentMethod;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', array_column(InvoiceType::cases(), 'value'));
            $table->string('number');
            $table->dateTimeTz('issue_date');
            $table->enum('payment_method', array_column(PaymentMethod::cases(), 'value'));
            $table->enum('currency', array_column(Currency::cases(), 'value'));
            $table->boolean('is_already_paid');
            $table->dateTimeTz('sale_date');
            $table->dateTimeTz('due_date');
            $table->decimal('total', 12, 2);
            $table->decimal('total_vat_amount', 12, 2);
            $table->decimal('total_discount_amount', 12, 2);
            $table->decimal('grand_total', 12, 2);
            $table->string('secret_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
