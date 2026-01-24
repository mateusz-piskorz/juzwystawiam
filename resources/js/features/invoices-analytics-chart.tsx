/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiOptionsFilter } from '@/components/common/multi-options-filter';
import { NoInvoicesMessage } from '@/components/common/no-invoices-message';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { api } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { cn } from '@/lib/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

type Props = {
    className?: string;
    withFilters?: boolean;
};

export const InvoicesAnalyticsChart = ({ className, withFilters = true }: Props) => {
    const locale = useLocale().locale['dashboard/analytics'];

    const searchParams = useSearchParams();
    const period = searchParams.get('period');
    const product = searchParams.getAll('product');

    const { data } = useQuery({
        queryKey: ['chart-data', period, product],
        queryFn: () =>
            api['invoices.status-monthly-distribution'](
                withFilters ? { queries: { period: period as any, 'product[]': product as unknown as number[] } } : undefined,
            ),
    });

    const products = useQuery({
        queryKey: ['products'],
        // todo: add q - searchQuery (refactor MultiOptionsFilter)
        queryFn: () => api['products.index']({ queries: { limit: 100 } }),
        enabled: withFilters,
    });

    const chartConfig = {
        paid: {
            label: locale.paid,
            color: '#60a5fa',
        },
        unpaid: {
            label: locale.unpaid,
            color: '#d6d6d8',
        },
    } satisfies ChartConfig;

    const noInvoices = !data?.overall.total && !period && !product.length;

    return (
        <div className="relative overflow-x-auto">
            {withFilters && (
                <div className="mb-4">
                    <MultiOptionsFilter
                        title={locale.Period}
                        options={[
                            { label: locale['This year'], value: 'this_year' },
                            { label: locale['Prev year'], value: 'prev_year' },
                        ]}
                        filterKey="period"
                        singleChoice
                    />
                    <MultiOptionsFilter
                        title="Product"
                        options={(products.data?.data || []).map((e) => ({ value: String(e.id), label: e.name }))}
                        filterKey="product"
                    />
                </div>
            )}

            <ChartContainer config={chartConfig} className={cn('h-[350px] w-full min-w-[600px]', noInvoices && 'blur-[1.5px]', className)}>
                <BarChart
                    accessibilityLayer
                    data={data?.months?.map(({ month, paid, unpaid }) => ({
                        month,
                        paid,
                        unpaid,
                    }))}
                >
                    <CartesianGrid vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="paid" fill="var(--color-paid)" radius={2} />
                    <Bar dataKey="unpaid" fill="var(--color-unpaid)" radius={2} />
                </BarChart>
            </ChartContainer>
            {noInvoices && (
                <div className="absolute inset-0 z-50 -mt-[150px] flex items-center justify-center">
                    <Card className="border-none">
                        <CardContent>
                            <NoInvoicesMessage />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};
