/* eslint-disable @typescript-eslint/no-unused-vars */

import { router } from '@inertiajs/react';
import { castArray, omit } from 'lodash';
import { buildURLParams } from '../utils/build-url-params';
import { usePage } from './use-page';

export const useSearchParams = () => {
    const {
        props: { ziggy },
    } = usePage();

    return {
        get: (paramName: string): string | undefined => {
            const param = ziggy.query[paramName];
            return param === undefined ? undefined : typeof param === 'string' ? param : param[0];
        },
        getAll: (paramName: string): string[] => castArray(ziggy.query[paramName]).filter((e) => e),
        has: (paramName: string | string[]) => {
            const paramKeys = castArray(paramName);
            return Object.keys(ziggy.query).some((e) => paramKeys.includes(e));
        },
        set: (args: { [key: string]: string | string[] | null }) => {
            const params = {
                ...omit(ziggy.query, Object.keys(args)),
                ...Object.fromEntries(Object.entries(args).filter(([_, val]) => val && val.length > 0)),
            };

            router.replace({
                url: `${window.location.pathname}?${buildURLParams(params)}`,
                props: (currentProps) => ({ ...currentProps, ziggy: { ...ziggy, query: params } }),
                preserveState: true,
            });
        },
        clear: (keys: string | string[]) => {
            const paramKeys = castArray(keys);
            const params = {
                ...omit(ziggy.query, paramKeys),
            };

            router.replace({
                url: `${window.location.pathname}?${buildURLParams(params)}`,
                props: (currentProps) => ({ ...currentProps, ziggy: { ...ziggy, query: params } }),
                preserveState: true,
            });
        },
    };
};
