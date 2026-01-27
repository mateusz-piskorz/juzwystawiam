import { z } from 'zod';
import { schemas } from '../constants/zod/openapi.json.client';
import { Contractor } from './contractor';

export type InvoiceContractor = Contractor & {
    role: z.infer<typeof schemas.ContractorRole>;
};

export type InvoiceEmail = {
    id: number;
    invoice_id: number;
    status: z.infer<typeof schemas.EmailStatus>;
    recipient: string;
    created_at: string;
    updated_at: string;
};

export type InvoiceProduct = {
    created_at: string;
    discount: number | null;
    id: number;
    invoice_id: number;
    measure_unit: z.infer<typeof schemas.MeasureUnit>;
    name: string;
    price: number;
    product_id: number | null;
    quantity: number;
    updated_at: string;
    vat_rate: z.infer<typeof schemas.VatRate>;
    total: number;
    total_vat_amount: number;
    total_discount_amount: number;
    grand_total: number;
};

export type Invoice = {
    id: number;
    created_at: string;
    currency: z.infer<typeof schemas.Currency>;
    due_date: string;
    invoice_contractors: InvoiceContractor[];
    invoice_products: InvoiceProduct[];
    is_already_paid: boolean;
    issue_date: string;
    number: string;
    payment_method: z.infer<typeof schemas.PaymentMethod>;
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
