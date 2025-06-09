import { Contractor } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { PencilLine, UserRound, UserRoundPlus } from 'lucide-react';
import { OptionProps } from 'react-select';
import { ContractorAddress } from './contractor-address';
import { Option } from './types';

type Props = {
    props: OptionProps;
    onEdit: (val: Contractor) => void;
};

export const CustomOption = ({ onEdit, props }: Props) => {
    const data = props.data as Option;
    const isNew = data.__isNew__;

    return (
        <div {...props.innerProps} className={cn('flex cursor-default justify-between rounded p-4', props.isFocused && 'bg-accent')}>
            {isNew ? (
                <>
                    <div className="flex items-start gap-2">
                        <UserRoundPlus aria-label="user-icon-plus" size={20} />
                        <div>
                            <h4 className="font-bold">{data.label}</h4>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-start gap-2">
                        <UserRound aria-label="user-icon" size={20} />
                        <div>
                            <h4 className="font-bold">{data.name}</h4>
                            <ContractorAddress {...data} />
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                        <PencilLine size={20} className="cursor-pointer" onClick={() => onEdit(data)} />
                        <p className="text-sm">NIP: {data.nip}</p>
                    </div>
                </>
            )}
        </div>
    );
};
