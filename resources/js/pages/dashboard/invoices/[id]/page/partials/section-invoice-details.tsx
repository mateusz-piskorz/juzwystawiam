import { DashboardHeading } from '@/components/common/dashboard-heading';
import { useLocale } from '@/lib/hooks/use-locale';
import { Invoice, InvoiceContractor } from '@/lib/types/invoice';
import dayjs from 'dayjs';

type Props = {
    invoice: Invoice;
    seller?: InvoiceContractor;
    buyer?: InvoiceContractor;
};

export const SectionInvoiceDetails = ({ invoice, buyer, seller }: Props) => {
    const locale = useLocale().locale['dashboard/invoices'];
    return (
        <div className="px-4 md:px-8">
            <DashboardHeading className="mb-4" title={locale.Details} description={locale['Review and manage invoice details']} />
            <ul>
                <li>
                    {locale.Number}: <span className="text-muted-foreground">{invoice.number}</span>
                </li>
                <li>
                    {locale.Seller}:{' '}
                    <span className="text-muted-foreground">
                        {seller?.company_name}, {seller?.street_name}, {seller?.postal_code}, {seller?.city}
                    </span>
                </li>
                <li>
                    {locale.Buyer}:{' '}
                    <span className="text-muted-foreground">
                        {buyer?.company_name}, {buyer?.street_name}, {buyer?.postal_code}, {buyer?.city}
                    </span>
                </li>
                <li>
                    {locale['Create Date']}: <span className="text-muted-foreground">{dayjs(invoice.created_at).format('DD-MM-YYYY')}</span>
                </li>
                <li>
                    {locale['Sale Date']}: <span className="text-muted-foreground">{dayjs(invoice.sale_date).format('DD-MM-YYYY')}</span>
                </li>
                <li>
                    {locale['Grand Total']}: <span className="text-muted-foreground">{invoice.grand_total}</span>
                </li>
            </ul>
        </div>
    );
};
