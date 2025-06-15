import { FormLabel } from '@/components/ui/form';
import { CSSProperties } from 'react';
import { SingleValueProps } from 'react-select';

export const SingleValue = (props: SingleValueProps, label: string) => {
    return (
        <div style={props.getStyles('singleValue', props) as CSSProperties} className="flex flex-col">
            <FormLabel className="text-muted-foreground text-xs">{label}</FormLabel>
            <p className="text-base">{props.children}</p>
            {/* <FormLabel>{label}</FormLabel> */}
            {/* <span>{props.label}</span> */}
            {/* {!data.__isNew__ && <ContractorNip nip={data.nip} />} */}
        </div>
    );
};
