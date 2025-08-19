import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const limit = z.union([z.number(), z.null()]).optional();
const TypeOfBusiness = z.enum(["PRIVATE_PERSON", "SELF_EMPLOYED", "OTHER_BUSINESS"]);
const UpsertContractorRequest = z.object({ type_of_business: TypeOfBusiness, is_own_company: z.boolean(), nip: z.string().min(10).max(10).optional(), postal_code: z.string(), city: z.string(), country: z.string(), company_name: z.string().optional(), street_name: z.string(), email: z.union([z.string(), z.null()]).optional(), phone: z.union([z.string(), z.null()]).optional(), bank_account: z.union([z.number(), z.null()]).optional(), first_name: z.string().optional(), surname: z.string().optional() }).passthrough();
const Contractor = z.object({ id: z.number().int(), user_id: z.number().int(), type_of_business: z.string(), is_own_company: z.string(), postal_code: z.string(), city: z.string(), country: z.string(), company_name: z.string(), street_name: z.string(), bank_account: z.union([z.string(), z.null()]), nip: z.union([z.string(), z.null()]), email: z.union([z.string(), z.null()]), phone: z.union([z.string(), z.null()]), first_name: z.union([z.string(), z.null()]), surname: z.union([z.string(), z.null()]), created_at: z.union([z.string(), z.null()]), updated_at: z.union([z.string(), z.null()]) }).passthrough();
const InvoiceType = z.enum(["VAT", "NO_VAT"]);
const PaymentMethod = z.enum(["BANK_TRANSFER", "CASH", "CARD", "BARTER", "CHEQUE", "COD", "OTHER", "COMPENSATION", "LETTER_OF_CREDIT", "PAYPAL", "PAYU", "PROMISSORY_NOTE", "PREPAYMENT", "INSTALLMENT_SALE", "TPAY", "PRZELEWY24", "DOTPAY"]);
const Currency = z.enum(["PLN", "EUR", "USD", "GBP", "SEK", "CAD", "JPY", "DKK", "CZK", "NOK", "HUF", "AUD", "UAH", "CHF", "RUB", "ZAR", "INR", "NZD", "RON", "CNY", "HRK", "BGN", "BRL", "MXN", "TRY", "SGD", "HKD", "ISK", "ILS", "CLP", "PHP", "MYR", "IDR", "KRW", "XDR", "THB"]);
const ContractorRole = z.enum(["SELLER", "BUYER"]);
const MeasureUnit = z.enum(["PCS", "HOUR", "SERVICE"]);
const VatRate = z.enum(["23", "8", "0", "5"]);
const UpsertInvoiceRequest = z.object({ type: InvoiceType, number: z.string(), issue_date: z.string().datetime({ offset: true }), payment_method: PaymentMethod, currency: Currency, is_already_paid: z.boolean(), sale_date: z.string().datetime({ offset: true }), due_date: z.string().datetime({ offset: true }), secret_note: z.string().optional(), invoice_contractors: z.array(z.object({ contractor_id: z.string(), role: ContractorRole }).passthrough()).optional(), invoice_products: z.array(z.object({ product_id: z.union([z.string(), z.null()]).optional(), name: z.string(), quantity: z.number().int(), price: z.number(), measure_unit: MeasureUnit, discount: z.union([z.number(), z.null()]).optional(), vat_rate: VatRate.optional() }).passthrough()).min(1) }).passthrough();
const Invoice = z.object({ id: z.number().int(), user_id: z.number().int(), type: z.string(), number: z.string(), issue_date: z.string(), payment_method: z.string(), currency: z.string(), is_already_paid: z.string(), sale_date: z.string(), due_date: z.string(), total: z.string(), total_vat_amount: z.string(), total_discount_amount: z.string(), grand_total: z.string(), secret_note: z.union([z.string(), z.null()]), created_at: z.union([z.string(), z.null()]), updated_at: z.union([z.string(), z.null()]) }).passthrough();
const period = z.union([z.enum(["this_year", "prev_year"]), z.null()]).optional();
const q = z.union([z.string(), z.null()]).optional();
const measure_unit = z.union([z.string(), z.array(z.string()), z.null()]).optional();
const sort = z.union([z.enum(["price", "measure_unit", "vat_rate"]), z.null()]).optional();
const sort_direction = z.union([z.enum(["asc", "desc"]), z.null()]).optional();
const ProductResource = z.object({ id: z.number().int(), user_id: z.number().int(), name: z.string(), description: z.union([z.string(), z.null()]), price: z.number(), measure_unit: MeasureUnit, vat_rate: VatRate, created_at: z.union([z.string(), z.null()]), updated_at: z.union([z.string(), z.null()]) }).passthrough();
const UpsertProductRequest = z.object({ name: z.string().max(255), price: z.number(), measure_unit: MeasureUnit, vat_rate: VatRate, description: z.union([z.string(), z.null()]).optional() }).passthrough();
const profile_update_profile_Body = z.object({ name: z.string().max(255), email: z.string().max(255).email() }).passthrough();
const profile_update_password_Body = z.object({ current_password: z.string(), password: z.string(), password_confirmation: z.string() }).passthrough();

export const schemas = {
	limit,
	TypeOfBusiness,
	UpsertContractorRequest,
	Contractor,
	InvoiceType,
	PaymentMethod,
	Currency,
	ContractorRole,
	MeasureUnit,
	VatRate,
	UpsertInvoiceRequest,
	Invoice,
	period,
	q,
	measure_unit,
	sort,
	sort_direction,
	ProductResource,
	UpsertProductRequest,
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
				name: "limit",
				type: "Query",
				schema: limit
			},
		],
		response: z.object({}).partial().passthrough(),
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
				schema: UpsertContractorRequest
			},
		],
		response: z.string(),
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
				schema: UpsertContractorRequest
			},
			{
				name: "contractor",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: Contractor,
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
				name: "limit",
				type: "Query",
				schema: limit
			},
		],
		response: z.object({}).partial().passthrough(),
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
				schema: UpsertInvoiceRequest
			},
		],
		response: z.void(),
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
				schema: UpsertInvoiceRequest
			},
			{
				name: "invoice",
				type: "Path",
				schema: z.number().int()
			},
		],
		response: Invoice,
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
		alias: "invoices.status-monthly-series",
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
		response: z.object({ months: z.string(), overall: z.object({ paid: z.string(), unpaid: z.string(), total: z.string() }).passthrough() }).passthrough(),
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
		alias: "invoices.status-distribution-by-year",
		requestFormat: "json",
		response: z.array(z.string()),
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
		response: z.union([z.string(), z.array(z.string())]),
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
				schema: measure_unit
			},
			{
				name: "vat_rate",
				type: "Query",
				schema: measure_unit
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
		response: z.object({ data: z.array(ProductResource), meta: z.object({ current_page: z.number().int(), from: z.union([z.number(), z.null()]), last_page: z.number().int(), links: z.array(z.object({ url: z.union([z.string(), z.null()]), label: z.string(), active: z.boolean() }).passthrough()), path: z.union([z.string(), z.null()]), per_page: z.number().int(), to: z.union([z.number(), z.null()]), total: z.number().int() }).passthrough(), links: z.object({ first: z.union([z.string(), z.null()]), last: z.union([z.string(), z.null()]), prev: z.union([z.string(), z.null()]), next: z.union([z.string(), z.null()]) }).passthrough() }).passthrough(),
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
				schema: UpsertProductRequest
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
				schema: UpsertProductRequest
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
