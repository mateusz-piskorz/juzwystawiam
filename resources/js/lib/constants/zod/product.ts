import { z } from 'zod';
import { MEASURE_UNIT } from '../enums/measure-unit';
import { VAT_RATE } from '../enums/vat-rate';

export const createProductDTO = z.object({
    name: z.string().nonempty().max(255),
    description: z.string().optional(),
    price: z.coerce.number().min(0),
    measure_unit: z.nativeEnum(MEASURE_UNIT),
    vat_rate: z.nativeEnum(VAT_RATE),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
