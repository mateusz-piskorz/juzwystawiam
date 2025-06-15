import { Contractor } from '@/lib/types';
import { cn } from '@/lib/utils/cn';
import { UserRoundPlus } from 'lucide-react';
import { OptionProps } from 'react-select';
import { ContractorInfo } from './contractor-info';
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
                <ContractorInfo {...data} onEdit={() => onEdit(data)} />
            )}
        </div>
    );
};
