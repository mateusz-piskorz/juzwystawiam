import { SharedData } from '@/lib/types';
import { usePage as usePageInertia } from '@inertiajs/react';

export const usePage = <T>() => {
    return usePageInertia<SharedData & T>();
};
