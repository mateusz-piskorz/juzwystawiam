import { FormLabel } from '@/components/ui/form';
import { CSSProperties } from 'react';
import { components, InputProps } from 'react-select';

type Props = {
    inputProps: InputProps;
    label: string;
};

export const CustomInput = ({ inputProps, label }: Props) => (
    <div
        style={{
            ...(inputProps.getStyles('input', inputProps) as CSSProperties),
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '4px',
            paddingRight: '4px',
        }}
    >
        {inputProps.value && <FormLabel className="text-muted-foreground text-xs">{label}</FormLabel>}
        <components.Input {...inputProps} isHidden={false} />
    </div>
);
