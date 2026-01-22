'use client';
import { InvoiceStatusChartLegend } from '@/components/common/invoice-status-chart-legend';
import { NoInvoicesMessage } from '@/components/common/no-invoices-message';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { api } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useQuery } from '@tanstack/react-query';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

export function InvoiceStatusDonutChart() {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/analytics'], ...l['dashboard'] };

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

    const { data } = useQuery({
        queryKey: ['invoice-status-donut-chart-data'],
        queryFn: api['invoices.status-yearly-distribution'],
    });

    const chartData = [
        { status: 'paid', value: data?.this_year.paid, fill: '#60a5fa' },
        { status: 'unpaid', value: data?.this_year.unpaid, fill: '#d6d6d8' },
    ];

    const thisYearTotal = (data?.this_year.paid ?? 0) + (data?.this_year.unpaid ?? 0);
    const prevYearTotal = (data?.prev_year.paid ?? 0) + (data?.prev_year.unpaid ?? 0);
    const percentage = prevYearTotal === 0 ? 0 : Number((((thisYearTotal - prevYearTotal) / prevYearTotal) * 100).toFixed(1));

    return (
        <Card className="flex min-w-[350px] flex-col border-none">
            <CardContent className="flex-1 pb-0">
                {thisYearTotal ? (
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={chartData} dataKey="value" nameKey="status" innerRadius={60} />
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <NoInvoicesMessage className="h-[250px]" />
                )}

                <InvoiceStatusChartLegend />
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {prevYearTotal > 0 && (
                        <>
                            {locale['Trending is']} {percentage >= 0 ? 'up' : 'down'} {locale.by} {Math.abs(percentage)}% {locale['this year']}{' '}
                            {percentage >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        </>
                    )}
                </div>
                <div className="text-muted-foreground leading-none">{locale['Showing total invoices for this year']}</div>
            </CardFooter>
        </Card>
    );
}
