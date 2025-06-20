import { ChevronDown } from 'lucide-react';
import { DropdownIndicatorProps } from 'react-select';

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
        <ChevronDown className="text-muted-foreground m-4 opacity-50" size={16} />
        // <div {...props.innerProps} style={props.getStyles('dropdownIndicator', props) as CSSProperties}>
        //     DropdownIndicator
        // </div>
    );
};
