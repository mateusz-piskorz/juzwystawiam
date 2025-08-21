import { z } from 'zod';
import { schemas } from '../constants/zod/openapi.json.client';

export type Product = {
    id: number;
    user_id: number;
    name: string;
    price: number;
    measure_unit: z.infer<typeof schemas.MeasureUnit>;
    vat_rate: z.infer<typeof schemas.VatRate>;
    description?: string | undefined;
    updated_at: string; // Date
    created_at: string; // Date
};
