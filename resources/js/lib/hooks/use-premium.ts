import { usePage } from './use-page';

export const usePremium = () => {
    const { props } = usePage();

    return { premiumDays: props.auth.user.premium_days, hasPremium: props.auth.user.premium_days > 0 };
};
