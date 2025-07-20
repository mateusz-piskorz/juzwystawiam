import ConfirmDialog from '@/components/common/confirm-dialog';
import { DataTable } from '@/components/common/data-table';
import { MEASURE_UNIT } from '@/lib/constants/enums/measure-unit';
import { VAT_RATE } from '@/lib/constants/enums/vat-rate';
import { deleteProduct, getProducts } from '@/lib/data/products';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { getProductColumns } from './product-columns';
import { UpsertProductDialog } from './upsert-product-dialog';

export const ProductTable = () => {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);

    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');
    const order_column = searchParams.get('order_column');
    const order_direction = searchParams.get('order_direction') as OrderDirection;
    const vat_rate = searchParams.getAll('vat_rate');
    const measure_unit = searchParams.getAll('measure_unit');

    const { data, refetch } = useQuery({
        queryKey: ['product-list', page, limit, q, order_column, order_direction, vat_rate, measure_unit],
        queryFn: () => getProducts({ page, limit, q, order_column, order_direction, vat_rate, measure_unit }),
    });

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct({ productId });
            toast.success(`Product deleted successfully`);
            refetch();
            setOpenConfirm(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : 'Something went wrong');
        }
    };

    const columns = getProductColumns({
        handleDeleteProduct: (productId: number) => {
            setSelectedProductId(productId);
            setOpenConfirm(true);
        },
        handleEditProduct: async (productId: number) => {
            const product = data?.data.find((p) => p.id === productId);
            if (!product) return;

            setSelectedProductId(productId);
            setOpen(true);
        },
    });

    return (
        <>
            <UpsertProductDialog
                open={open}
                onSuccess={() => refetch()}
                setOpen={setOpen}
                defaultValues={data?.data.find((e) => e.id === selectedProductId)}
                productId={selectedProductId}
            />

            <ConfirmDialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                onContinue={async () => {
                    if (selectedProductId) {
                        await handleDeleteProduct(selectedProductId);
                    }
                }}
                title="Are you sure you want to remove this product?"
                description="This action cannot be undone. Product will be permanently deleted."
            />

            <DataTable
                totalPages={String(data?.last_page)}
                data={data?.data ?? []}
                columns={columns}
                addNewRecord={{
                    label: 'Add new product',
                    action: () => {
                        setSelectedProductId(undefined);
                        setOpen(true);
                    },
                }}
                filters={[
                    {
                        filterKey: 'vat_rate',
                        title: 'Vat rate',
                        options: Object.values(VAT_RATE).map((e) => ({ label: e, value: e })),
                    },
                    {
                        filterKey: 'measure_unit',
                        title: 'Measure unit',
                        options: Object.values(MEASURE_UNIT).map((e) => ({ label: e, value: e })),
                    },
                ]}
            />
        </>
    );
};
