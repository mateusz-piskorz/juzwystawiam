import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type Props = {
    disabled: boolean;
    onRemove: () => void;
    total: string;
};
export const RemoveItemButton = ({ disabled, onRemove, total }: Props) => {
    return (
        <div className="flex items-center justify-end">
            <p className="text-nowrap md:text-sm">{total} PLN</p>

            <Button
                disabled={disabled}
                variant="ghost"
                type="button"
                onClick={onRemove}
                aria-label="remove item"
                className="cursor-pointer hover:bg-transparent"
            >
                <X />
            </Button>
        </div>
    );
};
