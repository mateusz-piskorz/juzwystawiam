// todo: check if we are using it
import { MEASURE_UNIT } from '../constants/enums/measure-unit';
import { VAT_RATE } from '../constants/enums/vat-rate';

export type Product = {
    id: number;
    user_id: number;
    name: string;
    price: number;
    measure_unit: MEASURE_UNIT;
    vat_rate: VAT_RATE;
    description?: string | undefined;
    updated_at: string; // Date
    created_at: string; // Date
};
