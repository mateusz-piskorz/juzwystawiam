import { useLocale } from '@/lib/hooks/use-locale';
import { usePage } from '@/lib/hooks/use-page';
import { Link } from '@inertiajs/react';

type Feature = { en: string; pl: string; grayed?: boolean };
type Props = {
    name: { en: string; pl: string };
    price: number;
    forever?: boolean;
    features: Feature[];
};

export const PricingItem = ({ name, price, forever, features }: Props) => {
    const { auth } = usePage().props;
    const { languageCode, locale } = useLocale();
    return (
        <Link className="w-full max-w-[400px] rounded-lg border-2 p-6 hover:ring-1" href={auth.user ? route('premium-account') : route('login')}>
            <h3 className="mb-4 text-2xl">{name[languageCode]}</h3>
            <div className="mb-4 flex items-end gap-1">
                <span className="text-4xl font-bold">{price} zł</span>
                <span className="py-1 text-sm text-green-700">{forever ? locale.root.Forever : `/${locale.root.month}`}</span>
            </div>
            <ul className="mt-6 w-full space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="">
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-700"></span>

                        <span className={feature.grayed ? 'text-muted-foreground' : ''}>{feature[languageCode]}</span>
                    </li>
                ))}
            </ul>
        </Link>
    );
};
