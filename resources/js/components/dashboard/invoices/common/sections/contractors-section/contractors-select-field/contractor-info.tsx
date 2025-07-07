import { TypeOfBusinessTranslation } from '@/lib/constants/enums/type-of-business';
import { Contractor } from '@/lib/types/contractor';
import { cn } from '@/lib/utils/cn';
import { PencilLine, User } from 'lucide-react';

type Props = Contractor & {
    className?: string;
    onEdit?: () => void;
};

// todo: we no longer keeps building_number in db, just street name is good
export const ContractorInfo = (p: Props) => {
    const addressFirstLine = `${p.street_name} ${p.building_number}`;
    const addressSecondLine = `${p.postal_code} ${p.city}`;
    return (
        <>
            <div className={cn('text-muted-foreground flex w-full justify-between text-sm', p.className)}>
                <div>
                    <h4 className="text-accent-foreground text-base">
                        {p.company_name || `${p.first_name} ${p.surname}`}
                        <User className="ml-1 inline-block" aria-label="user-icon" size={20} />
                    </h4>

                    <p>{addressFirstLine}</p>
                    <p>{addressSecondLine}</p>
                </div>
                <div className={cn('flex flex-col items-end justify-end', p.onEdit && 'justify-between')}>
                    {p.onEdit && <PencilLine size={20} className="text-accent-foreground cursor-pointer" onClick={p.onEdit} />}
                    <p>{p.nip ? `NIP: ${p.nip}` : TypeOfBusinessTranslation[p.type_of_business]}</p>
                </div>
            </div>
        </>
    );
};
