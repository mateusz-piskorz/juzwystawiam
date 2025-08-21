/* eslint-disable @typescript-eslint/no-explicit-any */

import ConfirmDialog from '@/components/common/confirm-dialog';
import { DataTable } from '@/components/common/data-table';
import { api, schemas } from '@/lib/constants/zod/openapi.json.client';
import { useLocale } from '@/lib/hooks/use-locale';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { OrderDirection } from '@/lib/types/order-direction';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { getProductColumns } from './product-columns';
import { UpsertProductDialog } from './upsert-product-dialog';

export const TableProduct = () => {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/products'], common: l.common, enum: l.enum };

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
        queryFn: () =>
            api['products.index']({
                queries: {
                    limit: limit ? Number(limit) : undefined,
                    q,
                    // todo: any type
                    sort: order_column as any,
                    sort_direction: order_direction,
                    vat_rate,
                    measure_unit,
                    page: page ? Number(page) : undefined,
                },
            }),
    });

    const handleDeleteProduct = async (productId: number) => {
        try {
            await api['products.destroy'](undefined, { params: { product: productId } });
            toast.success(locale['Product deleted successfully']);
            refetch();
            setOpenConfirm(false);
        } catch (err) {
            toast.error(typeof err === 'string' ? err : locale.common['something went wrong']);
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
        locale,
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
                title={`${locale['Are you sure you want to remove this product']}?`}
                description={locale['This action cannot be undone. Product will be permanently deleted']}
            />

            <DataTable
                totalPages={data?.meta.last_page}
                data={data?.data ?? []}
                columns={columns}
                addNewRecord={{
                    label: locale['Add new product'],
                    action: () => {
                        setSelectedProductId(undefined);
                        setOpen(true);
                    },
                }}
                filters={[
                    {
                        filterKey: 'vat_rate',
                        title: locale.common['Vat rate'],
                        options: schemas.VatRate.options.map((e) => ({ label: e, value: e })),
                    },
                    {
                        filterKey: 'measure_unit',
                        title: locale.common['Measure Unit'],
                        options: schemas.MeasureUnit.options.map((e) => ({ label: locale.enum.MEASURE_UNIT[e], value: e })),
                    },
                ]}
            />
        </>
    );
};
