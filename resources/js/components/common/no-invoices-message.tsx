import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/utils/cn';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

const locale = {
    en: {
        'No invoices this year': 'No invoices this year',
        'Issue an invoice': 'Issue an invoice',
    },
    pl: {
        'No invoices this year': 'Brak faktur w tym roku',
        'Issue an invoice': 'Wystaw fakturę',
    },
};

type Props = {
    className?: string;
};

export const NoInvoicesMessage = ({ className }: Props) => {
    const { languageCode } = useLocale();
    return (
        <div className={cn('flex h-full w-full flex-col justify-center text-center', className)}>
            <h2 className="text-xl font-bold">{locale[languageCode]['No invoices this year']}</h2>
            <Button variant="link">
                <Link prefetch href="/dashboard/invoices/create">
                    {locale[languageCode]['Issue an invoice']}
                </Link>
            </Button>
        </div>
    );
};
