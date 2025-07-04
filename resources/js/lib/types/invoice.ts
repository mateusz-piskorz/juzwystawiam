import { CONTRACTOR_ROLE } from '../constants/enums/contractor-role';
import { Currency } from '../constants/enums/currency';
import { INVOICE_TYPE } from '../constants/enums/invoice-type';
import { MEASURE_UNIT } from '../constants/enums/measure-unit';
import { PaymentMethod } from '../constants/enums/payment-method';
import { TYPE_OF_BUSINESS } from '../constants/enums/type-of-business';
import { VAT_RATE } from '../constants/enums/vat-rate';

type InvoiceContractor = {
    bank_account: string | null;
    building_number: string;
    city: string;
    company_name: string | null;
    contractor_id: number;
    country: string;
    created_at: string;
    email: string | null;
    first_name: string | null;
    id: number;
    invoice_id: number;
    is_own_company: boolean;
    nip: string | null;
    phone: string;
    postal_code: string;
    role: CONTRACTOR_ROLE;
    street_name: string;
    surname: string | null;
    type_of_business: TYPE_OF_BUSINESS;
    updated_at: string;
};

type InvoiceProductVat = {
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
};
type InvoiceProduct = {
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
};

export type Invoice =
    | {
          id: number;
          created_at: string;
          currency: Currency;
          due_date: string;
          invoice_contractors: InvoiceContractor[];
          invoice_products: InvoiceProductVat[];
          is_already_paid: boolean;
          issue_date: string;
          number: string;
          payment_method: PaymentMethod;
          sale_date: string;
          secret_note: string | null;
          type: INVOICE_TYPE.VAT;
          updated_at: string;
          user_id: number;
          total: number;
      }
    | {
          id: number;
          created_at: string;
          currency: Currency;
          due_date: string;
          invoice_contractors: InvoiceContractor[];
          invoice_products: InvoiceProduct[];
          is_already_paid: boolean;
          issue_date: string;
          number: string;
          payment_method: PaymentMethod;
          sale_date: string;
          secret_note: string | null;
          type: INVOICE_TYPE.NO_VAT;
          updated_at: string;
          user_id: number;
          total: number;
      };
