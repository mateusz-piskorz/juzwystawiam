import { ComponentProps } from 'react';
import CreatableSelect from 'react-select/creatable';

type Props = Pick<ComponentProps<typeof CreatableSelect>, 'isLoading' | 'options' | 'onChange' | 'value' | 'allowCreateWhileLoading'> & {
    highlighted?: boolean;
};

export const ReactSelectInput = (props: Props) => {
    return (
        <CreatableSelect
            {...props}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    ...(props.highlighted && { borderColor: 'green' }),
                }),
            }}
        />
    );
};
