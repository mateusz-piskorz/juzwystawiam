import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

type Props = {
    text: string;
};

export const FieldTooltip = ({ text }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="link" type="button" className="absolute top-[50%] -right-[15px] translate-x-[50%] -translate-y-[50%]">
                    <span className="sr-only">show tooltip ({text})</span>
                    <Info />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
};
