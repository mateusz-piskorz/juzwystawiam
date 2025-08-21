import { z } from 'zod';
import { schemas } from './openapi.json.client';

export const createProductDTO = z.object({
    name: z.string().nonempty().max(255),
    description: z.string().nullish(),
    price: z.coerce.number().min(0),
    measure_unit: schemas.MeasureUnit,
    vat_rate: schemas.VatRate,
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
