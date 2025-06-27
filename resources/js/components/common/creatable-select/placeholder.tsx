import { FormLabel } from '@/components/ui/form';
import { CSSProperties } from 'react';
import { PlaceholderProps } from 'react-select';

export const Placeholder = (props: PlaceholderProps) => {
    return (
        <div {...props.innerProps} style={props.getStyles('placeholder', props) as CSSProperties}>
            <FormLabel className="font-normal">{props.children}</FormLabel>
        </div>
    );
};
