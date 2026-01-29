<?php

use App\Enums\Currency;
use App\Enums\PaymentMethod;
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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('default_payment_method', array_column(PaymentMethod::cases(), 'value'))->default(PaymentMethod::CASH->value);
            $table->enum('default_currency', array_column(Currency::cases(), 'value'))->default(Currency::EUR->value);
            $table->foreignId('default_seller_id')->nullable()->constrained('contractors')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['default_seller_id']);
            $table->dropColumn(['default_payment_method', 'default_currency', 'default_seller_id']);
        });
    }
};
