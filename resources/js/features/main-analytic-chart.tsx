import { MultiOptionsFilter } from '@/components/common/multi-options-filter';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { getChartData } from '@/lib/data/invoices';
import { getProducts } from '@/lib/data/products';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { cn } from '@/lib/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

type Props = {
    className?: string;
    withFilters?: boolean;
};

export const MainAnalyticChart = ({ className, withFilters = true }: Props) => {
    const locale = useLocale().locale['dashboard/analytics'];

    const searchParams = useSearchParams();
    const period = searchParams.get('period');
    const product = searchParams.getAll('product');

    const { data } = useQuery({
        queryKey: ['chart-data', period, product],
        queryFn: () => getChartData(withFilters ? { period, product } : undefined),
    });

    const products = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts({ limit: '100' }),
        enabled: withFilters,
    });

    const chartConfig = {
        paid: {
            label: locale.paid,
            color: '#2563eb',
        },
        unpaid: {
            label: locale.unpaid,
            color: '#60a5fa',
        },
    } satisfies ChartConfig;

    return (
        <div className="overflow-x-auto">
            {withFilters && (
                <>
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
                </>
            )}

            <ChartContainer config={chartConfig} className={cn('h-[400px] w-full min-w-[600px]', className)}>
                <BarChart
                    accessibilityLayer
                    data={data?.map(({ month, paid, unpaid }) => ({
                        month,
                        paid,
                        unpaid,
                    }))}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="paid" fill="var(--color-paid)" radius={2} />
                    <Bar dataKey="unpaid" fill="var(--color-unpaid)" radius={2} />
                </BarChart>
            </ChartContainer>
        </div>
    );
};
