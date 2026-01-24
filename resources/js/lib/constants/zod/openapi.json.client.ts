import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const q = z.union([z.string(), z.null()]).optional();
const type_of_business = z.union([z.string(), z.array(z.string()), z.null()]).optional();
const sort = z.union([z.enum(["company_name", "is_own_company", "type_of_business"]), z.null()]).optional();
const sort_direction = z.union([z.enum(["asc", "desc"]), z.null()]).optional();
const limit = z.union([z.number(), z.null()]).optional();
const TypeOfBusiness = z.enum(["PRIVATE_PERSON", "SELF_EMPLOYED", "OTHER_BUSINESS"]);
const ContractorResource = z.object({ id: z.number().int(), user_id: z.number().int(), type_of_business: TypeOfBusiness, is_own_company: z.boolean(), postal_code: z.string(), city: z.string(), country: z.string(), company_name: z.string(), street_name: z.string(), bank_account: z.union([z.string(), z.null()]), nip: z.union([z.string(), z.null()]), email: z.union([z.string(), z.null()]), phone: z.union([z.string(), z.null()]), first_name: z.union([z.string(), z.null()]), surname: z.union([z.string(), z.null()]), created_at: z.union([z.string(), z.null()]), updated_at: z.union([z.string(), z.null()]) }).passthrough();
const StoreContractorRequest = z.object({ type_of_business: TypeOfBusiness, is_own_company: z.boolean(), nip: z.union([z.string(), z.null()]).optional(), postal_code: z.string(), city: z.string(), country: z.string(), company_name: z.union([z.string(), z.null()]).optional(), street_name: z.string(), email: z.union([z.string(), z.null()]).optional(), phone: z.union([z.string(), z.null()]).optional(), bank_account: z.union([z.string(), z.null()]).optional(), first_name: z.union([z.string(), z.null()]).optional(), surname: z.union([z.string(), z.null()]).optional() }).passthrough();
const UpdateContractorRequest = z.object({ type_of_business: TypeOfBusiness, is_own_company: z.union([z.boolean(), z.null()]), nip: z.union([z.string(), z.null()]), postal_code: z.union([z.string(), z.null()]), city: z.union([z.string(), z.null()]), country: z.union([z.string(), z.null()]), company_name: z.union([z.string(), z.null()]), street_name: z.union([z.string(), z.null()]), email: z.union([z.string(), z.null()]), phone: z.union([z.string(), z.null()]), bank_account: z.union([z.string(), z.null()]), first_name: z.union([z.string(), z.null()]), surname: z.union([z.string(), z.null()]) }).partial().passthrough();
const sort__2 = z.union([z.enum(["number", "type", "sale_date", "total", "is_already_paid"]), z.null()]).optional();
const InvoiceType = z.enum(["VAT", "NO_VAT"]);
const PaymentMethod = z.enum(["BANK_TRANSFER", "CASH", "CARD", "BARTER", "CHEQUE", "COD", "OTHER", "COMPENSATION", "LETTER_OF_CREDIT", "PAYPAL", "PAYU", "PROMISSORY_NOTE", "PREPAYMENT", "INSTALLMENT_SALE", "TPAY", "PRZELEWY24", "DOTPAY"]);
const EmailStatus = z.enum(["PENDING", "SENT", "FAILED"]);
const InvoiceEmailResource = z.object({ id: z.number().int(), invoice_id: z.number().int(), status: EmailStatus, recipient: z.string(), created_at: z.union([z.string(), z.null()]), updated_at: z.union([z.string(), z.null()]) }).passthrough();
const InvoiceResourceCollection = z.object({ id: z.number().int(), user_id: z.number().int(), type: InvoiceType, number: z.string(), issue_date: z.string(), payment_method: PaymentMethod, currency: z.string(), is_already_paid: z.boolean(), sale_date: z.string(), due_date: z.string(), total: z.string(), total_vat_amount: z.string(), total_discount_amount: z.string(), grand_total: z.string(), secret_note: z.union([z.string(), z.null()]), created_at: z.string(), updated_at: z.string(), latest_invoice_email: z.union([InvoiceEmailResource, z.null()]) }).passthrough();
const Currency = z.enum(["PLN", "EUR", "USD", "GBP", "SEK", "CAD", "JPY", "DKK", "CZK", "NOK", "HUF", "AUD", "UAH", "CHF", "RUB", "ZAR", "INR", "NZD", "RON", "CNY", "HRK", "BGN", "BRL", "MXN", "TRY", "SGD", "HKD", "ISK", "ILS", "CLP", "PHP", "MYR", "IDR", "KRW", "XDR", "THB"]);
const ContractorRole = z.enum(["SELLER", "BUYER"]);
const MeasureUnit = z.enum(["PCS", "HOUR", "SERVICE"]);
const VatRate = z.enum(["23", "8", "0", "5"]);
const StoreInvoiceRequest = z.object({ type: InvoiceType, number: z.string(), issue_date: z.string().datetime({ offset: true }), payment_method: PaymentMethod, currency: Currency, is_already_paid: z.boolean(), sale_date: z.string().datetime({ offset: true }), due_date: z.string().datetime({ offset: true }), secret_note: z.union([z.string(), z.null()]).optional(), invoice_contractors: z.array(z.object({ contractor_id: z.number().int(), role: ContractorRole }).passthrough()).optional(), invoice_products: z.array(z.object({ product_id: z.union([z.number(), z.null()]).optional(), name: z.string(), quantity: z.number().int(), price: z.number(), measure_unit: MeasureUnit, discount: z.union([z.number(), z.null()]).optional(), vat_rate: VatRate.optional() }).passthrough()).min(1) }).passthrough();
const UpdateInvoiceRequest = z.object({ type: InvoiceType, number: z.union([z.string(), z.null()]), issue_date: z.union([z.string(), z.null()]), payment_method: PaymentMethod, currency: Currency, is_already_paid: z.union([z.boolean(), z.null()]), sale_date: z.union([z.string(), z.null()]), due_date: z.union([z.string(), z.null()]), secret_note: z.union([z.string(), z.null()]), invoice_contractors: z.array(z.object({ contractor_id: z.number().int(), role: ContractorRole }).passthrough()), invoice_products: z.union([z.array(z.object({ product_id: z.union([z.number(), z.null()]), name: z.union([z.string(), z.null()]), quantity: z.union([z.number(), z.null()]), price: z.union([z.number(), z.null()]), measure_unit: MeasureUnit, discount: z.union([z.number(), z.null()]), vat_rate: VatRate }).partial().passthrough()), z.null()]) }).partial().passthrough();
const period = z.union([z.enum(["this_year", "prev_year"]), z.null()]).optional();
const StripePaymentIntentResource = z.object({ id: z.string(), amount: z.number().int(), status: z.string(), description: z.union([z.string(), z.null()]), created: z.number().int() }).passthrough();
const sort__3 = z.union([z.enum(["price", "measure_unit", "vat_rate"]), z.null()]).optional();
const ProductResource = z.object({ id: z.number().int(), user_id: z.number().int(), name: z.string(), description: z.union([z.string(), z.null()]), price: z.number(), measure_unit: MeasureUnit, vat_rate: VatRate, created_at: z.union([z.string(), z.null()]), updated_at: z.union([z.string(), z.null()]) }).passthrough();
const StoreProductRequest = z.object({ name: z.string().max(255), price: z.number(), measure_unit: MeasureUnit, vat_rate: VatRate, description: z.union([z.string(), z.null()]).optional() }).passthrough();
const UpdateProductRequest = z.object({ name: z.union([z.string(), z.null()]), price: z.union([z.number(), z.null()]), measure_unit: MeasureUnit, vat_rate: VatRate, description: z.union([z.string(), z.null()]) }).partial().passthrough();
const profile_update_profile_Body = z.object({ name: z.union([z.string(), z.null()]), email: z.union([z.string(), z.null()]) }).partial().passthrough();
const profile_update_password_Body = z.object({ current_password: z.string(), password: z.string(), password_confirmation: z.string() }).passthrough();

export const schemas = {
	q,
	type_of_business,
	sort,
	sort_direction,
	limit,
	TypeOfBusiness,
	ContractorResource,
	StoreContractorRequest,
	UpdateContractorRequest,
	sort__2,
	InvoiceType,
	PaymentMethod,
	EmailStatus,
	InvoiceEmailResource,
	InvoiceResourceCollection,
	Currency,
	ContractorRole,
	MeasureUnit,
	VatRate,
	StoreInvoiceRequest,
	UpdateInvoiceRequest,
	period,
	StripePaymentIntentResource,
	sort__3,
	ProductResource,
	StoreProductRequest,
	UpdateProductRequest,
	profile_update_profile_Body,
	profile_update_password_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/v1/contractors",
		alias: "contractors.index",
		requestFormat: "json",
		parameters: [
			{
				name: "q",
				type: "Query",
				schema: q
			},
			{
				name: "type_of_business",
				type: "Query",
				schema: type_of_business
			},
			{
				name: "is_own_company",
				type: "Query",
				schema: type_of_business
			},
			{
				name: "sort",
				type: "Query",
				schema: sort
			},
			{
				name: "sort_direction",
				type: "Query",
				schema: sort_direction
			},
			{
				name: "limit",
				type: "Query",
				schema: limit
			},
			{
				name: "page",
				type: "Query",
				schema: limit
			},
		],
		response: z.object({ data: z.array(ContractorResource), links: z.object({ first: z.union([z.string(), z.null()]), last: z.union([z.string(), z.null()]), prev: z.union([z.string(), z.null()]), next: z.union([z.string(), z.null()]) }).passthrough(), meta: z.object({ current_page: z.number().int(), from: z.union([z.number(), z.null()]), last_page: z.number().int(), links: z.array(z.object({ url: z.union([z.string(), z.null()]), label: z.string(), active: z.boolean() }).passthrough()), path: z.union([z.string(), z.null()]), per_page: z.number().int(), to: z.union([z.number(), z.null()]), total: z.number().int() }).passthrough() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/v1/contractors",
		alias: "contractors.store",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: StoreContractorRequest
			},
		],
		response: ContractorResource,
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "put",
		path: "/v1/contractors/:contractor",
		alias: "contractors.update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: UpdateContractorRequest
			},
			{
				name: "contractor",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: ContractorResource,
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/v1/contractors/:contractor",
		alias: "contractors.destroy",
		requestFormat: "json",
		parameters: [
			{
				name: "contractor",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: z.object({ message: z.literal("Contractor deleted") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/v1/invoices",
		alias: "invoices.index",
		requestFormat: "json",
		parameters: [
			{
				name: "q",
				type: "Query",
				schema: q
			},
			{
				name: "is_already_paid",
				type: "Query",
				schema: type_of_business
			},
			{
				name: "type",
				type: "Query",
				schema: type_of_business
			},
			{
				name: "sort",
				type: "Query",
				schema: sort__2
			},
			{
				name: "sort_direction",
				type: "Query",
				schema: sort_direction
			},
			{
				name: "limit",
				type: "Query",
				schema: limit
			},
			{
				name: "page",
				type: "Query",
				schema: limit
			},
		],
		response: z.object({ data: z.array(InvoiceResourceCollection), links: z.object({ first: z.union([z.string(), z.null()]), last: z.union([z.string(), z.null()]), prev: z.union([z.string(), z.null()]), next: z.union([z.string(), z.null()]) }).passthrough(), meta: z.object({ current_page: z.number().int(), from: z.union([z.number(), z.null()]), last_page: z.number().int(), links: z.array(z.object({ url: z.union([z.string(), z.null()]), label: z.string(), active: z.boolean() }).passthrough()), path: z.union([z.string(), z.null()]), per_page: z.number().int(), to: z.union([z.number(), z.null()]), total: z.number().int() }).passthrough() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/v1/invoices",
		alias: "invoices.store",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: StoreInvoiceRequest
			},
		],
		response: z.object({ id: z.number().int() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "put",
		path: "/v1/invoices/:invoice",
		alias: "invoices.update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: UpdateInvoiceRequest
			},
			{
				name: "invoice",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: z.object({ id: z.number().int() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/v1/invoices/:invoice",
		alias: "invoices.destroy",
		requestFormat: "json",
		parameters: [
			{
				name: "invoice",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: z.object({ message: z.literal("Invoice deleted") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/v1/invoices/:invoice/send-email-issuing-invoice",
		alias: "invoices.send-email",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ recipient: z.string().email() }).partial().passthrough()
			},
			{
				name: "invoice",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: z.object({ message: z.literal("Invoice sent") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/v1/invoices/charts/status-monthly-distribution",
		alias: "invoices.status-monthly-distribution",
		requestFormat: "json",
		parameters: [
			{
				name: "period",
				type: "Query",
				schema: period
			},
			{
				name: "product[]",
				type: "Query",
				schema: z.array(z.number().int()).optional()
			},
		],
		response: z.object({ months: z.array(z.object({ month: z.string(), paid: z.number().int(), unpaid: z.number().int(), total: z.number().int() }).passthrough()), overall: z.object({ paid: z.number().int(), unpaid: z.number().int(), total: z.number().int() }).passthrough() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/v1/invoices/charts/status-yearly-distribution",
		alias: "invoices.status-yearly-distribution",
		requestFormat: "json",
		response: z.object({ prev_year: z.object({ paid: z.number().int(), unpaid: z.number().int() }).passthrough(), this_year: z.object({ paid: z.number().int(), unpaid: z.number().int() }).passthrough() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/v1/premium-account/payments",
		alias: "premium-account.payments",
		requestFormat: "json",
		response: z.array(StripePaymentIntentResource),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/v1/products",
		alias: "products.index",
		requestFormat: "json",
		parameters: [
			{
				name: "q",
				type: "Query",
				schema: q
			},
			{
				name: "measure_unit",
				type: "Query",
				schema: type_of_business
			},
			{
				name: "vat_rate",
				type: "Query",
				schema: type_of_business
			},
			{
				name: "sort",
				type: "Query",
				schema: sort__3
			},
			{
				name: "sort_direction",
				type: "Query",
				schema: sort_direction
			},
			{
				name: "limit",
				type: "Query",
				schema: limit
			},
			{
				name: "page",
				type: "Query",
				schema: limit
			},
		],
		response: z.object({ data: z.array(ProductResource), links: z.object({ first: z.union([z.string(), z.null()]), last: z.union([z.string(), z.null()]), prev: z.union([z.string(), z.null()]), next: z.union([z.string(), z.null()]) }).passthrough(), meta: z.object({ current_page: z.number().int(), from: z.union([z.number(), z.null()]), last_page: z.number().int(), links: z.array(z.object({ url: z.union([z.string(), z.null()]), label: z.string(), active: z.boolean() }).passthrough()), path: z.union([z.string(), z.null()]), per_page: z.number().int(), to: z.union([z.number(), z.null()]), total: z.number().int() }).passthrough() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/v1/products",
		alias: "products.store",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: StoreProductRequest
			},
		],
		response: ProductResource,
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "put",
		path: "/v1/products/:product",
		alias: "products.update",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: UpdateProductRequest
			},
			{
				name: "product",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: ProductResource,
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/v1/products/:product",
		alias: "products.destroy",
		requestFormat: "json",
		parameters: [
			{
				name: "product",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: z.object({ message: z.literal("Product deleted") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 403,
				description: `Authorization error`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 404,
				description: `Not found`,
				schema: z.object({ message: z.string() }).passthrough()
			},
		]
	},
	{
		method: "put",
		path: "/v1/profile",
		alias: "profile.update-profile",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: profile_update_profile_Body
			},
		],
		response: z.object({ success: z.boolean() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/v1/profile",
		alias: "profile.delete-account",
		requestFormat: "json",
		parameters: [
			{
				name: "password",
				type: "Query",
				schema: z.string()
			},
		],
		response: z.object({ success: z.boolean() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
	{
		method: "put",
		path: "/v1/profile/password",
		alias: "profile.update-password",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: profile_update_password_Body
			},
		],
		response: z.object({ success: z.boolean() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthenticated`,
				schema: z.object({ message: z.string() }).passthrough()
			},
			{
				status: 422,
				description: `Validation error`,
				schema: z.object({ message: z.string(), errors: z.record(z.array(z.string())) }).passthrough()
			},
		]
	},
]);

export const api = new Zodios("/api", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
