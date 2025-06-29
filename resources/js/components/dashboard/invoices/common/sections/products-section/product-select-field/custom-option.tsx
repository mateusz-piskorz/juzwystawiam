import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { cn } from '@/lib/utils/cn';
import { Package, Timer, Wrench } from 'lucide-react';
import { OptionProps } from 'react-select';
import { Option } from './types';

type Props = {
    props: OptionProps;
};

const icons = {
    [MEASURE_UNIT.PCS]: <Package size={16} />,
    [MEASURE_UNIT.HOUR]: <Timer size={16} />,
    [MEASURE_UNIT.SERVICE]: <Wrench size={16} />,
};

export const CustomOption = ({ props }: Props) => {
    const data = props.data as Option;

    return (
        <div
            {...props.innerProps}
            className={cn('flex items-center justify-between gap-4 overflow-x-auto rounded p-4', props.isFocused && 'bg-accent')}
        >
            <div className="flex items-center gap-2">
                {icons[data.measure_unit]}
                <h4 className="whitespace-nowrap">{data.label}</h4>
            </div>
            <p className="text-muted-foreground text-sm whitespace-nowrap">
                {data.price}/{data.measure_unit}
            </p>
        </div>
    );
};
