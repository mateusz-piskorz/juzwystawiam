import { Contractor } from '@/lib/types/contractor';
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
        <div {...props.innerProps} className={cn('rounded p-4', props.isFocused && 'bg-accent')}>
            {isNew ? (
                <div className="flex items-start gap-2">
                    <UserRoundPlus aria-label="user-icon-plus" size={20} />
                    <h4>{data.label}</h4>
                </div>
            ) : (
                <ContractorInfo {...data} onEdit={() => onEdit(data)} />
            )}
        </div>
    );
};
