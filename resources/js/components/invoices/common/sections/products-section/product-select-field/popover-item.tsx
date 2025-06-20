import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

type Props = {
    product: Product;
    onClick: (product: Product) => void;
};
export const PopoverItem = ({ product, onClick }: Props) => {
    return (
        <li>
            <Button onClick={() => onClick(product)}>{product.name}</Button>
        </li>
    );
};
