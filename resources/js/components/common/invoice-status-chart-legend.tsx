import { useLocale } from '@/lib/hooks/use-locale';

export const InvoiceStatusChartLegend = () => {
    const locale = useLocale().locale['dashboard/analytics'];

    const statuses = [
        { label: locale.paid, color: '#60a5fa' },
        { label: locale.unpaid, color: '#d6d6d8' },
    ];
    return (
        <div className="flex justify-center gap-4">
            {statuses.map((status) => (
                <div key={status.label} className="flex items-center gap-2">
                    <span className="inline-block h-4 w-8 rounded border" style={{ backgroundColor: status.color }} />
                    <span className="text-sm font-medium">{status.label}</span>
                </div>
            ))}
        </div>
    );
};
