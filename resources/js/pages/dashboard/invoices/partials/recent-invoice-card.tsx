import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { schemas } from '@/lib/constants/zod/openapi.json.client';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarDays, CreditCard } from 'lucide-react';
import { z } from 'zod';

export const RecentInvoiceCard = ({ invoice }: { invoice: z.infer<typeof schemas.InvoiceResourceCollection> }) => {
    const isPaid = invoice.is_already_paid;

    return (
        <Link prefetch href={route('invoices.show', invoice.id)}>
            <Card className="border-border/50 hover:border-primary/30 w-[250px] rounded-none shadow-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="tracking-tighter uppercase italic">{invoice.number}</CardTitle>
                        <Badge
                            size="small"
                            variant={isPaid ? 'secondary' : 'outline'}
                            className={isPaid ? 'border-none bg-emerald-500/10 text-emerald-500' : 'border-amber-500/50 text-amber-500'}
                        >
                            {isPaid ? 'Paid' : 'Pending'}
                        </Badge>
                    </div>
                    <div className="space-y-1">
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                            <CalendarDays className="size-4" />
                            {format(new Date(invoice.issue_date), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                            <CreditCard className="size-4" />
                            {invoice.payment_method.replace('_', ' ')}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="text-xl font-bold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(Number(invoice.grand_total))}
                    </div>
                    <p className="text-muted-foreground text-sm">Due on {format(new Date(invoice.due_date), 'MMMM do')}</p>
                </CardContent>
            </Card>
        </Link>
    );
};
