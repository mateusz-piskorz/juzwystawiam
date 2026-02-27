import { api } from '@/lib/constants/zod/openapi.json.client';
import { useQuery } from '@tanstack/react-query';
import { RecentInvoiceCard } from './recent-invoice-card';

export const RecentInvoices = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['invoice-list'],
        queryFn: () =>
            api['invoices.index']({
                queries: { limit: 10, sort: 'created_at' },
            }),
    });

    if (isLoading) return <div className="h-40 animate-pulse rounded-xl bg-slate-50" />;

    const invoices = data?.data || [];

    return (
        <div className="w-full">
            <div className="flex gap-8 overflow-x-auto pt-2 pb-6">
                {invoices.map((invoice) => (
                    <div key={invoice.id} className="snap-center first:pl-0 last:pr-0">
                        <RecentInvoiceCard invoice={invoice} />
                    </div>
                ))}

                {invoices.length === 0 && (
                    <div className="w-full rounded-xl border-2 border-dashed border-slate-100 py-10 text-center">
                        <p className="text-slate-400">No recent invoices found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
