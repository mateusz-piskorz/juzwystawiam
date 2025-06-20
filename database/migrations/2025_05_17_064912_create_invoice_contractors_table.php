<?php

use App\Enums\ContractorRole;
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
        Schema::create('invoice_contractors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->foreignId('contractor_id')->constrained()->nullOnDelete();
            $table->enum('role', array_column(ContractorRole::cases(), 'value'));
            $table->boolean('is_own_company')->default(false);
            $table->string('name');
            $table->string('nip');
            $table->string('postal_code');
            $table->string('building_number');
            $table->string('city');
            $table->string('email')->nullable();
            $table->string('street_name')->nullable();
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
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
