import { router } from '@inertiajs/react';
import { LOCALE_CODE } from '../constants/enums/locale-code';
import { setCookie } from '../utils/set-cookie';
import { usePage } from './use-page';

export const useLocale = () => {
    const { localeData } = usePage().props;

    const setPreferredLocale = (lang: LOCALE_CODE) => {
        setCookie('locale', lang);

        router.reload();
    };

    return { localeData, setPreferredLocale };
};
