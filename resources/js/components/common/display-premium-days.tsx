import { getPremiumDays } from '@/lib/data/premium-account';
import { useQuery } from '@tanstack/react-query';

export const DisplayPremiumDays = () => {
    const { data } = useQuery({
        queryKey: ['getPremiumDays'],
        queryFn: getPremiumDays,
    });

    return <span>Active Premium days: {data?.premium_days}</span>;
};
