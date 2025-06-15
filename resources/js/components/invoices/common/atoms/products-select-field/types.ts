import { Contractor } from '@/lib/types';

type ReactControlOption<T = boolean> = { label: string; value: string; __isNew__: T };

export type Option = (Contractor & ReactControlOption<false>) | ReactControlOption<true>;
