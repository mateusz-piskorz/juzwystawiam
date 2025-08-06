import { Button } from '@/components/ui/button';
import { useLocale } from '@/lib/hooks/use-locale';

type Props = {
    days: number;
};

export const CardBuyPremium = ({ days }: Props) => {
    const locale = useLocale().locale['dashboard/premium-account'];

    const text = days !== 1 ? locale.days : locale.day;
    return (
        <div className="bg-secondary flex flex-col gap-2 rounded border p-4 py-6 text-center sm:max-w-[250px]">
            <a href={`/dashboard/premium-account/buy?days=${days}`}>
                <Button>
                    {days} {text} {locale['of Premium']}
                </Button>
            </a>
            <span className="text-muted-foreground">
                {locale['Premium account for']} {days} {text}
            </span>
        </div>
    );
};
