import { Contractor } from '@/lib/types/index';
import { cn } from '@/lib/utils/cn';
import { PencilLine, User } from 'lucide-react';

type Props = Pick<Contractor, 'building_number' | 'city' | 'postal_code' | 'street_name' | 'name' | 'nip'> & {
    className?: string;
    onEdit?: () => void;
};

export const ContractorInfo = ({ building_number, city, postal_code, street_name, name, nip, className, onEdit }: Props) => {
    return (
        <>
            <div className={cn('flex w-full justify-between', className)}>
                <div className="flex flex-col gap-1">
                    <h4>
                        {name}
                        <User className="ml-1 inline-block" aria-label="user-icon" size={20} />
                    </h4>

                    <div className="text-muted-foreground text-sm">
                        <p>
                            {street_name} {building_number}
                        </p>
                        <p>
                            {postal_code} {city}
                        </p>
                    </div>
                </div>
                <div className={cn('flex flex-col items-end', onEdit ? 'justify-between' : 'justify-end')}>
                    {onEdit && <PencilLine size={20} className="cursor-pointer" onClick={onEdit} />}
                    <p className="text-muted-foreground text-sm">NIP: {nip}</p>
                </div>
            </div>
        </>
    );
};
