import { useLocale } from '@/lib/hooks/use-locale';

export const SectionBenefits = () => {
    const locale = useLocale().locale['dashboard/premium-account'].benefits;
    return (
        <div>
            <h1 className="mb-2 text-xl font-medium">{locale.Benefits}</h1>
            <ul className="text-muted-foreground">
                <li>- {locale['unlimited invoices']}</li>
                <li>- {locale['unlimited emails']}</li>
                <li>- {locale['secret note for invoice']}</li>
                <li>- {locale['priority customer support']}</li>
                <li>- {locale['access to exclusive content']}</li>
            </ul>
        </div>
    );
};
