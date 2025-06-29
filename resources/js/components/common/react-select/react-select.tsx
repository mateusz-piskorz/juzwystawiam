/* eslint-disable react-hooks/exhaustive-deps */
import { ComponentProps, useCallback } from 'react';
import ReactSelectComponent, { InputProps } from 'react-select';
import { CustomInput } from './components/custom-input';
import { DropdownIndicator } from './components/dropdown-indicator';
import { Placeholder } from './components/placeholder';
import { STYLES, THEME } from './constants';

type Props = ComponentProps<typeof ReactSelectComponent> & { label: string };

export const ReactSelect = (props: Props) => {
    const { label } = props;

    const SingleValue = useCallback(() => <></>, []);
    const Input = useCallback((props: InputProps) => <CustomInput inputProps={props} label={label} />, []);

    return (
        <ReactSelectComponent
            {...props}
            menuPortalTarget={document.body}
            placeholder={label}
            components={{ Placeholder, DropdownIndicator, SingleValue, Input: Input, ...props.components }}
            styles={{ ...STYLES, ...props.styles }}
            theme={THEME}
        />
    );
};
