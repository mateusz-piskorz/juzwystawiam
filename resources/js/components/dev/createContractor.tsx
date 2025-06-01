import { Contractor, Pagination } from '@/lib/types';
import { apiFetch } from '@/lib/utils/api-fetch';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export const CreateContractor = () => {
    const [queryParams, setQueryParams] = useState('');
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);
        try {
            const res = await apiFetch<Pagination<Contractor>>(`/api/contractors/${queryParams}`, {
                method: 'POST',
                body: JSON.stringify({ cos: '' }),
            });
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
            <h1 className="mb-2">POST /api/contractors</h1>
            <div className="flex gap-4">
                {/* <Input
                    disabled={loading}
                    type="text"
                    placeholder="?nip=123&limit=10"
                    onChange={(e) => setQueryParams(e.target.value)}
                    value={queryParams}
                /> */}
                <Button disabled={loading} onClick={onClick} className="min-w-[150px]">
                    Fetch
                </Button>
            </div>
        </div>
    );
};
