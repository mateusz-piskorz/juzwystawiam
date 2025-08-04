import { LucideIcon } from 'lucide-react';

type Props = {
    text: string;
    Icon: LucideIcon;
};

export const ServiceItem = ({ text, Icon }: Props) => {
    return (
        <div className="flex w-full max-w-[270px] flex-col items-center gap-2 p-4 text-center">
            <Icon />
            <p className="text-sm">{text}</p>
        </div>
    );
};
