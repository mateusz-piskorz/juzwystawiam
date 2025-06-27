import { TypeOfBusinessTranslation } from '@/lib/constants/enums/type-of-business';
import { Contractor } from '@/lib/types/contractor';
import { cn } from '@/lib/utils/cn';
import { PencilLine, User } from 'lucide-react';

type Props = Contractor & {
    className?: string;
    onEdit?: () => void;
};

export const ContractorInfo = ({
    building_number,
    city,
    postal_code,
    street_name,
    company_name,
    nip,
    first_name,
    surname,
    type_of_business,
    className,
    onEdit,
}: Props) => {
    return (
        <>
            <div className={cn('flex w-full justify-between', className)}>
                <div className="flex flex-col gap-1">
                    <h4>
                        {company_name || `${first_name} ${surname}`}
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
                    {nip ? (
                        <p className="text-muted-foreground text-sm">NIP: {nip}</p>
                    ) : (
                        <p className="text-muted-foreground text-sm">{TypeOfBusinessTranslation[type_of_business]}</p>
                    )}
                </div>
            </div>
        </>
    );
};
