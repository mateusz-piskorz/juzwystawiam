<?php

use App\Enums\ContractorRole;
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
        Schema::create('invoice_contractors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->foreignId('contractor_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('role', array_column(ContractorRole::cases(), 'value'));
            $table->boolean('is_own_company')->default(false);
            $table->string('company_name');
            $table->string('nip')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('bank_account')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('street_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_contractors');
    }
};
