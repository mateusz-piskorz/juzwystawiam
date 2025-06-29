import { ComponentProps } from 'react';
import ReactSelect from 'react-select';

export const THEME: ComponentProps<typeof ReactSelect>['theme'] = {
    colors: {
        danger: '#DE350B',
        dangerLight: '#FFBDAD',
        neutral0: 'inherit',
        neutral5: 'hsl(0, 0%, 95%)',
        neutral10: 'hsl(0, 0%, 90%)',
        neutral20: 'var(--input)',
        neutral30: 'var(--color-input)',
        neutral40: 'var(--color-input)',
        neutral50: 'inherit',
        neutral60: 'hsl(0, 0%, 40%)',
        neutral70: 'hsl(0, 0%, 30%)',
        neutral80: 'inherit',
        neutral90: 'hsl(0, 0%, 10%)',
        primary: 'var(--color-accent)',
        primary25: 'var(--color-accent)',
        primary50: 'var(--color-accent)',
        primary75: '#4C9AFF',
    },
    spacing: {
        baseUnit: 4,
        controlHeight: 38,
        menuGutter: 8,
    },
    borderRadius: 4,
};

export const STYLES: ComponentProps<typeof ReactSelect>['styles'] = {
    menuList: (baseStyles) => ({
        ...baseStyles,
        border: '1px solid',
        borderRadius: '4px',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-background)',
        paddingLeft: '4px',
        paddingRight: '4px',
    }),
    control: (base, { isFocused }) => ({
        ...base,
        height: '60px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--accent)',
        },
        boxShadow: 'none',
        ...(isFocused && { outline: '1px solid var(--accent-foreground)' }),
    }),
    indicatorSeparator: () => ({ display: 'none' }),
};
