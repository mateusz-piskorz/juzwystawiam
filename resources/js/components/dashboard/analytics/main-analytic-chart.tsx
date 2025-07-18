import { MultiOptionsFilter } from '@/components/common/multi-options-filter';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { getChartData } from '@/lib/data/invoices';
import { getProducts } from '@/lib/data/products';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
    paid: {
        label: 'Paid',
        color: '#2563eb',
    },
    unpaid: {
        label: 'Unpaid',
        color: '#60a5fa',
    },
} satisfies ChartConfig;

export const MainAnalyticChart = () => {
    const searchParams = useSearchParams();
    const period = searchParams.get('period');
    const product = searchParams.getAll('product');

    const { data } = useQuery({
        queryKey: ['chart-data', period, product],
        queryFn: () => getChartData({ period, product }),
    });

    const products = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts({ limit: '100' }),
    });

    return (
        <div className="overflow-x-auto">
            <MultiOptionsFilter
                title="Period"
                options={[
                    { label: 'This year', value: 'this_year' },
                    { label: 'Prev year', value: 'prev_year' },
                ]}
                filterKey="period"
                singleChoice
            />
            <MultiOptionsFilter
                title="Product"
                options={(products.data?.data || []).map((e) => ({ value: String(e.id), label: e.name }))}
                filterKey="product"
            />

            <ChartContainer config={chartConfig} className="h-[400px] w-full min-w-[600px]">
                <BarChart accessibilityLayer data={data}>
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
