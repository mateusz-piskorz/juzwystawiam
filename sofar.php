<?php

// migrations
// users - done
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};


// contractors - done
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contractors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('nip')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contractors');
    }
};

// invoices - done
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->string('number');
            $table->date('issue_date');
            $table->date('sale_date')->nullable();
            $table->date('due_date')->nullable();
            $table->string('currency')->nullable();
            $table->string('status')->nullable();
            $table->text('notes')->nullable();
            $table->string('template')->nullable();
            $table->string('payment_method')->nullable();
            $table->decimal('total_paid', 15, 2)->nullable();
            $table->string('language')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

// invoice_items - done
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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

    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};

// invoice_contractor (pivot table) - done
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoice_contractor', function (Blueprint $table) {
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->foreignId('contractor_id')->constrained()->onDelete('cascade');
            $table->string('role'); // e.g. buyer, seller, recipient
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoice_contractor');
    }
};

// eloquent models
// User - done
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function contractors(): HasMany
    {
        return $this->hasMany(Contractor::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
// Contractor - done
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Contractor extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'nip',
        'address',
        'city',
        'postal_code',
        'country',
        'email',
        'phone',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoices(): BelongsToMany
    {
        return $this->belongsToMany(Invoice::class, 'invoice_contractor')
            ->withPivot('role');
    }
}
// Invoice - done
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'number',
        'issue_date',
        'sale_date',
        'due_date',
        'currency',
        'status',
        'notes',
        'template',
        'payment_method',
        'total_paid',
        'language',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function contractors(): BelongsToMany
    {
        return $this->belongsToMany(Contractor::class, 'invoice_contractor')
            ->withPivot('role');
    }
}

// InvoiceItem - done
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceItem extends Model
{
    protected $fillable = [
        'invoice_id',
        'name',
        'quantity',
        'unit',
        'net_price',
        'gross_price',
        'vat_rate',
        'pkwiu',
        'gtu',
        'discount',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}
