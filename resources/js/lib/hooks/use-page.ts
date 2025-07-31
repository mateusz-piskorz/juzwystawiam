import { usePage as usePageInertia } from '@inertiajs/react';
import type { Config } from 'ziggy-js';
import enLang from '../../../lang/en.json';
import { LOCALE_CODE } from '../constants/enums/locale-code';

type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    premium_access_expires_at: string | null;
    premium_days: number;
    [key: string]: unknown;
};

type SharedData = {
    name: string;
    quote: { message: string; author: string };
    auth: { user: User };
    ziggy: Config & { location: string; query: { [key: string]: string | string[] } };
    sidebarOpen: boolean;
    locale: {
        data: typeof enLang;
        languageCode: LOCALE_CODE;
    };
    [key: string]: unknown;
};

export const usePage = <T>() => {
    return usePageInertia<SharedData & T>();
};
