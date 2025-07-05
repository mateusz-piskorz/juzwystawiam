import { INVOICE_TYPE } from '@/lib/constants/enums/invoice-type';
import { CreateInvoiceDTO, NoVatSchema, VatSchema } from '@/lib/constants/zod/invoices';
import { NoVatForm } from '../forms/no-vat-form';
import { VatForm } from '../forms/vat-form';

type InvoiceTypeToSchema = {
    [INVOICE_TYPE.VAT]: VatSchema;
    [INVOICE_TYPE.NO_VAT]: NoVatSchema;
};

type Props = {
    type: INVOICE_TYPE;
    defaultValues?: CreateInvoiceDTO;
    invoiceId?: number;
};

export const InvoiceForm = ({ type, invoiceId, defaultValues }: Props) => {
    let invoiceForm = null;

    switch (type) {
        case INVOICE_TYPE.VAT:
            invoiceForm = <VatForm invoiceId={invoiceId} defaultValues={defaultValues as unknown as InvoiceTypeToSchema[INVOICE_TYPE.VAT]} />;
            break;

        case INVOICE_TYPE.NO_VAT:
            invoiceForm = <NoVatForm invoiceId={invoiceId} defaultValues={defaultValues as unknown as InvoiceTypeToSchema[INVOICE_TYPE.NO_VAT]} />;
            break;

        default:
            invoiceForm = <p className="text-destructive-foreground">Invoice type not found</p>;
    }

    console.log(invoiceForm);

    return invoiceForm;
};
