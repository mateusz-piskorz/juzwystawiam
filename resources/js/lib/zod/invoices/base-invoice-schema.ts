import { ContractorRole, InvoiceType } from '@/lib/constants/invoiceTypes';
import { z } from 'zod';

// when submitting a form we should show that user selected a product or a contractor from his saved list,
// if user gonna change some fields, this should update these fields in a saved product or contractor
// (if many same products we should take last one i think)

// if user not gonna select a contractor or a product, but some fields gonna match with ones in saved list (e.g. contractor.nip/product.name)
// we should prompt user to take an action: 'connect contractor/product from saved | create new contractor/product'

const invoiceContractor = z.object({
    id: z.number().min(2).optional(),
    role: z.nativeEnum(ContractorRole, { required_error: 'Role is required' }),
    name: z.string().min(1, 'Name is required'),
    nip: z.string().min(1, 'NIP is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional().nullable(),
    // address: z.string().min(1, 'Address is required'),
    // city: z.string().min(1, 'City is required'),
    // postal_code: z.string().min(1, 'Postal code is required'),
    // country: z.string().min(1, 'Country is required'),
});

export const invoiceItem = z.object({
    name: z.string().min(1, 'Item name is required'),
    quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
    net_price: z.coerce.number({ required_error: 'Net price is required' }),
    // vat: z.coerce.number().optional(), // Add VAT property as optional (required for VAT invoices)
    // unit: z.string().optional().nullable(),
    // gross_price: z.number({ required_error: 'Gross price is required' }),
    // pkwiu: z.string().optional().nullable(),
    // gtu: z.string().optional().nullable(),
    // discount: z.number().optional().nullable(),
});

export const baseInvoiceSchema = z.object({
    type: z.nativeEnum(InvoiceType, { required_error: 'Invoice type is required' }),
    number: z.string().min(1, 'Invoice number is required'),
    issue_date: z.string().min(1, 'Issue date is required'),
    // invoice_items: z.array(invoiceItem).min(1, 'At least one item is required'),
    invoice_contractors: z
        .array(invoiceContractor)
        .length(2, 'Exactly two contractors are required')
        .refine(
            (contractors) => {
                const roles = contractors.map((c) => c.role);
                return roles.includes(ContractorRole.Buyer) && roles.includes(ContractorRole.Seller);
            },
            { message: 'There must be one buyer and one seller' },
        ),
});

export type BaseInvoiceSchema = z.infer<typeof baseInvoiceSchema>;
