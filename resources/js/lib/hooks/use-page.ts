import { usePage as usePageInertia } from '@inertiajs/react';
import type { Config } from 'ziggy-js';
import { z } from 'zod';
import enLang from '../../../lang/en.json';
import { LOCALE_CODE } from '../constants/enums/locale-code';
import { schemas } from '../constants/zod/openapi.json.client';

type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    premium_access_expires_at: string | null;
    default_currency: z.infer<typeof schemas.Currency>;
    default_payment_method: z.infer<typeof schemas.PaymentMethod>;
    default_seller_id: number | undefined;
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
