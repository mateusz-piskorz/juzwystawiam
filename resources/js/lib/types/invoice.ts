import { CONTRACTOR_ROLE } from '../constants/enums/contractor-role';
import { CURRENCY } from '../constants/enums/currency';
import { EMAIL_STATUS } from '../constants/enums/email-status';
import { INVOICE_TYPE } from '../constants/enums/invoice-type';
import { MEASURE_UNIT } from '../constants/enums/measure-unit';
import { PAYMENT_METHOD } from '../constants/enums/payment-method';
import { VAT_RATE } from '../constants/enums/vat-rate';
import { Contractor } from './contractor';

type InvoiceContractor = Contractor & {
    role: CONTRACTOR_ROLE;
};

export type InvoiceEmail = {
    id: number;
    invoice_id: number;
    status: EMAIL_STATUS;
    recipient: string;
    created_at: string;
    updated_at: string;
};

export type InvoiceProduct = {
    created_at: string;
    discount: number | null;
    id: number;
    invoice_id: number;
    measure_unit: MEASURE_UNIT;
    name: string;
    price: number;
    product_id: number | null;
    quantity: number;
    updated_at: string;
    vat_rate: VAT_RATE;
    total: number;
    total_vat_amount: number;
    total_discount_amount: number;
    grand_total: number;
};

export type Invoice = {
    type: INVOICE_TYPE;
    id: number;
    created_at: string;
    currency: CURRENCY;
    due_date: string;
    invoice_contractors: InvoiceContractor[];
    invoice_products: InvoiceProduct[];
    is_already_paid: boolean;
    issue_date: string;
    number: string;
    payment_method: PAYMENT_METHOD;
    sale_date: string;
    secret_note: string | null;
    updated_at: string;
    user_id: number;
    total: number;
    total_vat_amount: number;
    total_discount_amount: number;
    grand_total: number;
    latest_invoice_email: InvoiceEmail | null;
    invoice_emails: InvoiceEmail[];
};
