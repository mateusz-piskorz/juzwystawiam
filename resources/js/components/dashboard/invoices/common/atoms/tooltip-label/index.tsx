import { FormLabel } from '@/components/ui/form';
import { FieldTooltip } from './field-tooltip';

type Props = {
    isTooltipVisible?: boolean;
    text: string;
    tooltipText: string;
};

export const TooltipLabel = ({ isTooltipVisible, text, tooltipText }: Props) => {
    return (
        <FormLabel className="flex">
            <div className="relative">
                {text}
                {isTooltipVisible && <FieldTooltip text={tooltipText} />}
            </div>
        </FormLabel>
    );
};
