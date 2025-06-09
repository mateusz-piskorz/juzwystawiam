import { CSSProperties } from 'react';
import { SingleValueProps } from 'react-select';
import { ContractorNip } from './contractor-nip';
import { Option } from './types';

export const CustomSingleValue = (props: SingleValueProps) => {
    const data = props.data as Option;

    return (
        <div style={props.getStyles('singleValue', props) as CSSProperties} className="flex items-center justify-between gap-2">
            <span>{data.label}</span>
            {!data.__isNew__ && <ContractorNip nip={data.nip} />}
        </div>
    );
};
