import { Contractor } from '@/lib/types/index';
import { cn } from '@/lib/utils/cn';

type Props = Pick<Contractor, 'building_number' | 'city' | 'postal_code' | 'street_name'> & { className?: string };

export const ContractorAddress = ({ building_number, city, postal_code, street_name, className }: Props) => {
    return (
        <div className={cn('text-muted-foreground text-sm', className)}>
            <p>
                {street_name} {building_number}
            </p>
            <p>
                {postal_code} {city}
            </p>
        </div>
    );
};
