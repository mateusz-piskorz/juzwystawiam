import { ComponentProps } from 'react';
import ReactSelectCreatable from 'react-select/creatable';
import { DropdownIndicator } from './components/dropdown-indicator';
import { Placeholder } from './components/placeholder';
import { SingleValue } from './components/single-value';
import { STYLES, THEME } from './constants';

type Props = ComponentProps<typeof ReactSelectCreatable> & { label: string };

export const ReactCreatableSelect = (props: Props) => {
    const { label } = props;
    return (
        <ReactSelectCreatable
            {...props}
            menuPortalTarget={document.body}
            placeholder={label}
            //todo: add styled noOptionsMessage component
            components={{ Placeholder, DropdownIndicator, SingleValue: (props) => SingleValue(props, label), ...props.components }}
            styles={{ ...STYLES, ...props.styles }}
            theme={THEME}
        />
    );
};
