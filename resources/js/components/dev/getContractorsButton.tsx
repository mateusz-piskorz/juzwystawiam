import { apiFetch } from '@/lib/utils/api-fetch';
import { buildURLParams } from '@/lib/utils/build-url-params';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const GetContractorsButton = () => {
    const [queryParams, setQueryParams] = useState('');
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);

        try {
            const res = await apiFetch(
                `/api/contractors/?${buildURLParams({ is_own_company: ['false', 'true'], nip: 69, name: ['contractor1', 'contractor69'] })}`,
            );
            // const res = await apiFetch<Pagination<Contractor>>(`/api/contractors/${queryParams}`);
            console.log(res);
            toast.success('success');
        } catch (e) {
            console.log('error:');
            console.log(e);
            toast.success('failed - check logs');
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <h1 className="mb-2">GET /api/contractors/(queryParams)</h1>
            <div className="flex gap-4">
                <Input
                    disabled={loading}
                    type="text"
                    placeholder="?nip=123&limit=10"
                    onChange={(e) => setQueryParams(e.target.value)}
                    value={queryParams}
                />
                <Button disabled={loading} onClick={onClick} className="min-w-[150px]">
                    Fetch
                </Button>
            </div>
        </div>
    );
};
