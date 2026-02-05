<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property bool $is_own_company
 * @property string $company_name
 * @property string|null $nip
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $bank_account
 * @property string|null $country
 * @property string|null $city
 * @property string|null $postal_code
 * @property string|null $street_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\ContractorFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereBankAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereIsOwnCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereNip($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereStreetName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Contractor whereUserId($value)
 */
	class Contractor extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int|null $expense_type_id
 * @property string|null $description
 * @property numeric $total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereExpenseTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Expense whereUserId($value)
 */
	class Expense extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string|null $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ExpenseTypeFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExpenseType whereUserId($value)
 */
	class ExpenseType extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $number
 * @property string $issue_date
 * @property string $payment_method
 * @property string $currency
 * @property bool $is_already_paid
 * @property string $sale_date
 * @property string $due_date
 * @property numeric $total
 * @property numeric $total_vat_amount
 * @property numeric $total_discount_amount
 * @property numeric $grand_total
 * @property string|null $secret_note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InvoiceContractor> $invoiceContractors
 * @property-read int|null $invoice_contractors_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InvoiceEmail> $invoiceEmails
 * @property-read int|null $invoice_emails_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InvoiceProduct> $invoiceProducts
 * @property-read int|null $invoice_products_count
 * @property-read \App\Models\InvoiceEmail|null $latestInvoiceEmail
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\InvoiceFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereGrandTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereIsAlreadyPaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereSaleDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereSecretNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereTotalDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereTotalVatAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Invoice whereUserId($value)
 */
	class Invoice extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $invoice_id
 * @property int|null $contractor_id
 * @property string $role
 * @property bool $is_own_company
 * @property string $company_name
 * @property string|null $nip
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $bank_account
 * @property string|null $country
 * @property string|null $city
 * @property string|null $postal_code
 * @property string|null $street_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Invoice $invoice
 * @method static \Database\Factories\InvoiceContractorFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereBankAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereContractorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereIsOwnCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereNip($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereStreetName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceContractor whereUpdatedAt($value)
 */
	class InvoiceContractor extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $invoice_id
 * @property string $status
 * @property string $recipient
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Invoice $invoice
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail whereRecipient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceEmail whereUpdatedAt($value)
 */
	class InvoiceEmail extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $invoice_id
 * @property int|null $product_id
 * @property string $name
 * @property int $quantity
 * @property numeric $price
 * @property string $measure_unit
 * @property string $vat_rate
 * @property int|null $discount
 * @property numeric $total
 * @property numeric $total_vat_amount
 * @property numeric $total_discount_amount
 * @property numeric $grand_total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Invoice $invoice
 * @method static \Database\Factories\InvoiceProductFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereGrandTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereMeasureUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereTotalDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereTotalVatAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InvoiceProduct whereVatRate($value)
 */
	class InvoiceProduct extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $description
 * @property float $price
 * @property string $measure_unit
 * @property string $vat_rate
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\ProductFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereMeasureUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereVatRate($value)
 */
	class Product extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $premium_access_expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $stripe_id
 * @property string|null $pm_type
 * @property string|null $pm_last_four
 * @property string|null $trial_ends_at
 * @property string $default_payment_method
 * @property string $default_currency
 * @property int|null $default_seller_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Contractor> $contractors
 * @property-read int|null $contractors_count
 * @property-read \App\Models\Contractor|null $defaultSeller
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ExpenseType> $expenseTypes
 * @property-read int|null $expense_types_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Expense> $expenses
 * @property-read int|null $expenses_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Invoice> $invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read mixed $premium_days
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Cashier\Subscription> $subscriptions
 * @property-read int|null $subscriptions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User hasExpiredGenericTrial()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User onGenericTrial()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDefaultCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDefaultPaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDefaultSellerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePmLastFour($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePmType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePremiumAccessExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStripeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTrialEndsAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

