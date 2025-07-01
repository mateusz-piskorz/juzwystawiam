import { router } from '@inertiajs/react';
import { castArray, has, omit } from 'lodash';
import { buildURLParams } from '../utils/build-url-params';
import { usePage } from './use-page';

export const useSearchParams = () => {
    const {
        props: { ziggy },
    } = usePage();

    return {
        get: (paramName: string): string[] => {
            const param = ziggy.query[paramName];
            return param === undefined ? [] : castArray(paramName);
        },

        has: (paramName: string | string[]) => has(ziggy.query, castArray(paramName)),

        set: (paramName: string | string[], paramValue: string | string[] | null) => {
            const paramKeys = castArray(paramName);

            const params = { ...omit(ziggy.query, paramKeys), ...(paramValue && { ...Object.fromEntries(paramKeys.map((e) => [e, paramValue])) }) };

            router.replace({
                url: `${ziggy.location}?${buildURLParams(params)}`,
                props: (currentProps) => ({ ...currentProps, ziggy: { ...ziggy, query: params } }),
            });
        },
    };
};
