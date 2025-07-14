import { Button } from '@/components/ui/button';

type Props = {
    days: number;
};

export const BuyPremiumCard = ({ days }: Props) => {
    const text = days !== 1 ? 'days' : 'day';
    return (
        <div className="bg-secondary flex flex-col gap-2 rounded border p-4 py-6 text-center sm:max-w-[250px]">
            <a href="/dashboard/premium-account/buy?days=1">
                <Button>
                    {days} {text} of Premium
                </Button>
            </a>
            <span className="text-muted-foreground">
                Premium account for {days} {text}
            </span>
        </div>
    );
};
