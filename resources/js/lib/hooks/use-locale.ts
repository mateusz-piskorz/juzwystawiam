import { LOCALE_CODE } from '../constants/enums/locale-code';
import { setCookie } from '../utils/set-cookie';
import { usePage } from './use-page';

export const useLocale = () => {
    const {
        locale: { data, languageCode },
    } = usePage().props;

    const setPreferredLocale = (lang: LOCALE_CODE) => {
        setCookie('locale', lang);

        location.reload();
    };

    return { locale: data, languageCode, setPreferredLocale };
};
